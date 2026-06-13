import { Request, Response } from "express";
import { EventModel } from "../models/event.js";
import { UserModel } from "../models/user.js";
import { formDataShape } from "../schemas/event.schema.js";
import * as z from "zod";

// add a new event
async function addEvent(req: Request, res: Response) {
  // zod validation on shape
  const result = formDataShape.safeParse(req.body.data);

  if (!result.success) {
    return res.status(400).json({
      title: "Invalid request data",
      message: result.error.message,
      success: false
    })
  }
  const data = result.data;

  // extra validation
  // validate user
  const userExists = await UserModel.exists({ username: data.createdBy });

  if (!userExists) return res.status(404).json({
    success: false,
    title: "Bad access",
    message: "User does not exist",
  })

  // add the event to the db
  const event = new EventModel(data);
  await event.save();

  console.log("event added successfully");
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
