import { Request, Response } from "express";
import { EventModel } from "../models/event.js";
import { formDataSer } from "../types/formData.js";
import { UserModel } from "../models/user.js";

// add a new event
async function addEvent(req: Request, res: Response) {
  const data: formDataSer = req.body.data;

  // validation

  // validate title, desc and urls
  if (
    data.title.trim().length > 50 ||
    data.desc.trim().length > 200 ||
    data.imgurl.trim().length > 300 ||
    data.location.trim().length > 300
  ) {
    return res.json({
      success: false,
      message: "Invalid length of form values, please check the length of either title, desc, imgurl or location",
    });
  }

  // validate maxnums
  if (data.maxnums <= 0 || data.maxnums > 100) {
    return res.json({
      success: false,
      message: "Invalid value for maxnums",
    });
  }

  if (!["recreational", "tech", "art"].includes(data.category)) {
    return res.json({
      success: false,
      message: "Invalid category type"
    });
  }

  // validate dates
  const now = new Date();

  const startDate = (
    data.startDate instanceof Date ? data.startDate : new Date(data.startDate)
  );

  const deadDate = (
    data.deadDate instanceof Date ? data.deadDate : new Date(data.deadDate)
  );

  if (startDate <= now || deadDate <= now) {
    return res.json({
      success: false,
      message: "Event cannot start in the past",
    })
  }

  if (startDate <= deadDate) {
    return res.json({
      success: false,
      message: "Start time should be strictly after the deadline time",
    })
  }

  // validate user
  const userExists = await UserModel.exists({ username: data.createdBy });

  if (!userExists) return res.json({
    success: false,
    message: "User does not exist",
  })
}

// get all available events
async function getAllEvents(req: Request, res: Response) {
  try {
    const allEvents = await EventModel.find().sort({ date: -1 });

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

    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({
        message: " Event Not Found!",
        success: false
      })
    }

    res.json({
      message: " Event Fetched Sucessfully!",
      data: event,
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

export { addEvent, getAllEvents, eventById };
