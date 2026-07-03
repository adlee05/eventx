import { Request, Response } from "express";
import { EventModel } from "../models/event.js";
import { UserModel } from "../models/user.js";
import { formDataShape } from "../schemas/event.schema.js";
import { RegistrationModel } from "../models/registrations.js";
import { MongoServerError } from "mongodb";
import { registrationSchema } from "../schemas/event.registration.js";
import { success } from "zod";
import mongoose from "mongoose";

// so that we don't need to pass session object to every db instruction
mongoose.set('transactionAsyncLocalStorage', true);

// add a new event
async function addEvent(req: Request, res: Response) {
  // zod validation on shape
  const result = formDataShape.safeParse(req.body.data);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.message,
      success: false
    })
  }
  const data = result.data;

  // imp validation
  const now = new Date();

  if (data.deadDate >= data.startDate) {
    return res.status(400).json({
      success: false,
      message: "Registration deadline must be before the event starts."
    });
  }

  if (data.startDate <= now || data.deadDate <= now) {
    return res.status(400).json({
      message: "Both event start and registration deadline must be in the future.",
      success: false
    })
  }

  // add the event to the db
  try {
    const event = new EventModel({
      ...data,
      createdBy: req.user.userId
    });
    await event.save();
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    })
  }

  return res.status(201).json({
    message: "Event created successfully",
    success: true
  })
}

// get all available events
async function getAllEvents(req: Request, res: Response) {
  try {
    const allEvents = await EventModel.find({
      deadDate: { $gt: new Date() }
    })
      .select("title description category imageUrl location startDate _id")
      .sort({ startDate: -1 });

    return res.status(200).json({
      message: "All events fetched successfully!",
      success: true,
      data: allEvents,
    });

  } catch (error) {
    console.error("Error fetching all events!", error);
    return res.status(500).json({
      message: "Failed to fetch events!",
      success: false
    });
  }
}

// Get event details by ID
async function eventById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = registrationSchema.safeParse({ eventId: id });

    if (!result.success) {
      return res.status(404).json({
        message: " Event Not Found!",
        success: false
      })
    }

    const data = result.data;

    const event = await EventModel.findById(data.eventId).select("_id title description category startDate deadDate location imageUrl createdBy createdAt updatedAt registrationCount maxParticipants");

    if (!event) {
      return res.status(404).json({
        message: "Event does not exist!",
        success: false
      })
    }

    const username = await UserModel.findById(event.createdBy).select("username");

    // get registered status of user
    let registered = false;

    if (req.user) {
      const isRegistered = await RegistrationModel.exists({ userId: req.user.userId, eventId: data.eventId });
      if (isRegistered) registered = true;
    }

    const eventData = {
      ...event.toObject(),
      createdBy: username?.username,
      registered: registered
    }

    console.log(eventData);

    res.json({
      message: "Event Fetched Sucessfully!",
      data: eventData,
      success: true
    });

  } catch (error) {
    console.error("Error fetching Event", error);

    res.status(500).json({
      message: "Failed to fetch Event!",
      success: false
    });
  }
}

// register for an event 
async function register(req: Request, res: Response) {
  // validate data
  const result = registrationSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid data shape, check eventId " + result.error.message,
      success: false
    })
  }
  const data = result.data;

  try {
    const now = new Date();

    const eventDates = await EventModel.findById(data.eventId).select("startDate deadDate");

    if (!eventDates) {
      return res.status(404).json({
        message: "Event not found",
        success: false
      })
    }

    if (eventDates.startDate < now || eventDates.deadDate < now) {
      return res.status(400).json({
        message: "You can no longer register for this event.",
        success: false
      })
    }

    const registrationCount = await mongoose.connection.transaction(async () => {
      // increment registrationCount atomically
      const updatedEvent = await EventModel.findOneAndUpdate({
        _id: data.eventId,
        $expr: { $lt: ["$registrationCount", "$maxParticipants"] }
      }, {
        $inc: { registrationCount: 1 }
      }, {
        new: true
      });

      if (!updatedEvent) {
        const exists = await EventModel.exists({ _id: data.eventId });

        if (!exists) {
          throw new Error("EVENT_NOT_FOUND");
        }

        throw new Error("EVENT_FULL");
      }

      const registration = new RegistrationModel({
        userId: req.user.userId,
        eventId: data.eventId
      });

      await registration.save();

      return updatedEvent.registrationCount;
    })

    return res.status(200).json({
      message: "successfully registered",
      data: {
        registrationCount: registrationCount,
      },
      success: true
    });
  }
  catch (e) {
    if (e instanceof MongoServerError && e.code === 11000) {
      return res.status(409).json({
        message: "Already registered",
        success: false
      });
    } else if (e instanceof Error && e.message === 'EVENT_NOT_FOUND') {
      return res.status(404).json({
        message: "Event not found",
        success: false
      })
    } else if (e instanceof Error && e.message === 'EVENT_FULL') {
      return res.status(409).json({
        message: "Event is full",
        success: false
      })
    } else {
      return res.status(500).json({
        message: "Internal Server Error, try again",
        success: false
      });
    }
  }
}

async function deleteRegistration(req: Request, res: Response) {
  // validate data
  const result = registrationSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid data shape, check eventId " + result.error.message,
      success: false
    })
  }

  const data = result.data;

  // check if there's any registration
  try {
    const registrationCount = await mongoose.connection.transaction(async () => {
      const registrationExists = await RegistrationModel.deleteOne({
        userId: req.user.userId,
        eventId: data.eventId
      });

      if (!registrationExists.deletedCount) {
        throw new Error("NO_REGISTRATION");
      }

      const updatedEvent = await EventModel.findOneAndUpdate({
        _id: data.eventId,
        registrationCount: { $gt: 0 }
      }, {
        $inc: { registrationCount: -1 }
      }, {
        new: true
      })

      if (!updatedEvent) {
        throw new Error("UNABLE_TO_UPDATE");
      }

      return updatedEvent.registrationCount;
    })

    return res.status(200).json({
      message: "Unregistered successfully",
      data: {
        registrationCount: registrationCount
      },
      success: true
    })
  } catch (e) {
    console.error(e);

    if (e instanceof Error && e.message == "NO_REGISTRATION") {
      return res.status(200).json({
        message: "User was not registered",
        success: true
      })
    }

    if (e instanceof Error && e.message == "UNABLE_TO_UPDATE") {
      return res.status(500).json({
        message: "Unable to update registration",
        success: false
      })
    }

    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
}

export { addEvent, getAllEvents, eventById, register, deleteRegistration };
