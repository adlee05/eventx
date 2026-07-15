import { Request, Response } from "express";
import { EventModel } from "../models/event.js";
import { UserModel } from "../models/user.js";
import { formDataShape } from "../schemas/event.schema.js";
import { RegistrationModel } from "../models/registrations.js";
import { MongoServerError } from "mongodb";
import { registrationSchema } from "../schemas/event.registration.js";
import { success } from "zod";
import mongoose, { QueryFilter } from "mongoose";
import { error } from "node:console";

// so that we don't need to pass session object to every db instruction in the transaction
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

async function getAllEvents(req: Request, res: Response) {
  console.log(req.query);

  try {
    const {
      category,
      search,
      page = "1",
      limit = "12",
    } = req.query;

    const filter: any = {
      archived: false,
      deadDate: { $gt: new Date() },
    };

    // category filter
    if (category) {
      filter.category = {
        $in: Array.isArray(category) ? category : [category],
      };
    }

    // search filter
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const events = await EventModel.find(filter)
      .select("title description category imageUrl location startDate _id")
      .sort({ startDate: 1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await EventModel.countDocuments(filter);

    return res.status(200).json({
      message: "Events fetched successfully!",
      success: true,
      data: events,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        pages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error);

    return res.status(500).json({
      message: "Failed to fetch events!",
      success: false,
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

    const event = await EventModel.findById(data.eventId).select("_id title description category startDate deadDate location imageUrl createdBy createdAt updatedAt registrationCount maxParticipants archived");

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
      createdByUname: username?.username,
      registered: registered
    }

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
        $expr: { $lt: ["$registrationCount", "$maxParticipants"] },
        archived: false
      }, {
        $inc: { registrationCount: 1 }
      }, {
        new: true
      });

      if (!updatedEvent) {
        const event = await EventModel.findById(data.eventId);

        if (!event) {
          throw new Error("EVENT_NOT_FOUND");
        }

        if (event.archived) {
          throw new Error("ARCHIVED");
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
    } else if (e instanceof Error && e.message === 'ARCHIVED') {
      return res.status(400).json({
        message: "Cannot register for the event",
        success: false
      })
    }
    else {
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
    const dates = await EventModel.findById(data.eventId).select("startDate deadDate");

    if (!dates) {
      throw new Error("EVENT_NOT_FOUND");
    }

    const now = new Date();

    if (dates.startDate < now || dates.deadDate < now) {
      throw new Error("DATES");
    }

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
        registrationCount: { $gt: 0 },
      }, {
        $inc: { registrationCount: -1 }
      }, {
        new: true
      })

      if (!updatedEvent) {
        const event = await EventModel.findById(data.eventId);

        if (!event) {
          throw new Error("EVENT_NOT_FOUND");
        }

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

    if (e instanceof Error && e.message === "NO_REGISTRATION") {
      return res.status(200).json({
        message: "User was not registered",
        success: true
      })
    }

    if (e instanceof Error && e.message === 'EVENT_NOT_FOUND') {
      return res.status(404).json({
        message: "Event not found",
        success: false
      })
    }

    if (e instanceof Error && e.message === "DATES") {
      return res.status(200).json({
        message: "Event has already started",
        success: true
      })
    }

    if (e instanceof Error && e.message === "UNABLE_TO_UPDATE") {
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

async function archiveEvent(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const event = await EventModel.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false
      });
    }

    event.archived = !event.archived;

    await event.save();

    return res.status(200).json({
      message: "Archive action successful",
      success: true
    })
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    })
  }
}

async function editEvent(req: Request, res: Response) {
  const { id } = req.params;

  const result = formDataShape.safeParse(req.body.data);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.message,
      success: false
    })
  }
  const data = result.data;

  try {
    const eventDetails = await EventModel.findById(id).select("registrationCount maxParticipants createdBy archived");

    if (!eventDetails) {
      return res.status(404).json({
        message: "Event not found",
        success: false
      })
    }

    if (eventDetails.archived) {
      return res.status(400).json({
        message: "Cannot edit archived event",
        success: false
      })
    }

    if (eventDetails.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized",
        success: false
      })
    }

    if (eventDetails.registrationCount > data.maxParticipants) {
      return res.status(400).json({
        message: `Max participants cannot be less than current registrations (${eventDetails.maxParticipants})`,
        success: false
      })
    }

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

    await EventModel.findByIdAndUpdate(id, data);

    return res.status(200).json({
      message: "Event details updated successfully",
      success: true
    })
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    })
  }
}

async function getRegistrations(req: Request, res: Response) {
  const { id } = req.params;
  console.log("Fetching registrations for event:", id);

  try {
    const eventDetails = await EventModel.findById(id).select("createdBy");

    if (!eventDetails) {
      return res.status(404).json({
        message: "Event not found",
        success: false
      })
    }

    if (eventDetails.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Unauthorized",
        success: false
      })
    }
    type PopulatedUser = {
      _id: string;
      firstname: string;
      lastname: string;
      username: string;
      email: string;
    };

    const registrations = await RegistrationModel.find({
      eventId: id,
    }).populate<{ userId: PopulatedUser }>({
      path: "userId",
      select: "firstname lastname username email",
    });

    const participants = registrations.map((reg) => {
      return {
        id: reg.userId._id,
        firstname: reg.userId.firstname,
        lastname: reg.userId.lastname,
        username: reg.userId.username,
        email: reg.userId.email,
        registeredAt: reg.createdAt,
      };
    });

    return res.status(200).json({
      message: "Registrations fetched successfully",
      success: true,
      data: participants
    })
  } catch (e) {

  }
}

async function removeRegistration(req: Request, res: Response) {
  const { id, userId } = req.params;

  try {
    // verify event exists and requester is the owner
    const event = await EventModel.findById(id).select("createdBy");

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }

    if (!event.createdBy.equals(req.user.userId)) {
      return res.status(403).json({
        message: "Unauthorized!",
        success: false,
      });
    }

    const registrationCount = await mongoose.connection.transaction(async () => {
      const registration = await RegistrationModel.findOneAndDelete({
        userId,
        eventId: id,
      });

      if (!registration) {
        throw new Error("NO_REGISTRATION");
      }

      const updatedEvent = await EventModel.findOneAndUpdate(
        {
          _id: id,
          registrationCount: { $gt: 0 },
        },
        {
          $inc: { registrationCount: -1 },
        },
        {
          new: true,
        }
      );

      if (!updatedEvent) {
        throw new Error("UNABLE_TO_UPDATE");
      }

      return updatedEvent.registrationCount;
    });

    return res.status(200).json({
      message: "Participant removed successfully",
      data: {
        registrationCount,
      },
      success: true,
    });
  } catch (e) {
    console.error(e);

    if (e instanceof Error) {
      switch (e.message) {
        case "NO_REGISTRATION":
          return res.status(200).json({
            message: "User was not registered",
            success: true,
          });

        case "UNABLE_TO_UPDATE":
          return res.status(500).json({
            message: "Unable to update registration count",
            success: false,
          });
      }
    }

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
}

export {
  addEvent,
  getAllEvents,
  eventById,
  register,
  deleteRegistration,
  archiveEvent,
  editEvent,
  getRegistrations,
  removeRegistration
};
