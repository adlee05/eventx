import { Request, Response } from "express";
import { EventModel } from "../models/event.js";
import axios from "axios";

// add a new event
async function addEvent(req: Request, res: Response) {
  try {
    const { title, description, startTime, endTime, imageUrl, location,
      status, category } = req.body;

    if (!title || !description || !startTime || !endTime || !location) {
      return res.status(400).json({
        message: "Must fill all required fields!",
        success: false
      });
    }

    //@ts-ignore
    const userId = req.user.userId;

    const event = await EventModel.create({
      title,
      category,
      startTime,
      endTime,
      description,
      location,
      imageUrl,
      status,
      createdBy: userId,
      registeredUsers: [],
    });

    return res.status(201).json({
      message: "Event added successfully!",
      event,
      success: false
    });

  } catch (error) {
    console.error("Error adding Event!", error);
    return res.status(500).json({
      message: "Failed to add Event!",
      success: false
    });
  }

}

// Get events created by a user
async function userEvents(req: Request, res: Response) {
  try {
    const userId = req.user.userId;

    const events = await EventModel.find({ userId }).sort({ date: -1 });

    res.json({
      message: " Events fetched Sucessfully!",
      data: events
    });

  } catch (error) {
    console.error("Error fetching Events!", error);
    res.status(500).json({
      message: "Failed to fetch Events!",
    });
  }
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

// delete a particular event
async function deleteEventById(req: Request, res: Response) {
  try {

    const { id } = req.params;

    const userId = req.user.userId;

    const event = await EventModel.findOneAndDelete({ _id: id, userId })

    res.status(200).json({
      message: " Event Deleted SucessFully!"
    })

  } catch (error) {

    console.error("Error Deleting all events!", error);
    return res.status(500).json({
      message: "Failed to Delete events!",
    });

  }
}

async function changeEventDetails(req: Request, res: Response) {
  try {

    const { id } = req.params;
    const { title, description, date, imageUrl, location,
      certificateText, certificateTemplateUrl, status } = req.body;

    //@ts-ignore
    const userId = req.user.userId;

    const event = await EventModel.findOne({ _id: id, userId });

    if (!event) {
      res.status(404).json({
        message: "Event Not Found!"
      })
    }

    if (event) {
      if (title) event.title = title;
      if (description) event.description = description;
      if (date) event.date = date;
      if (imageUrl) event.imageUrl = imageUrl;
      if (location) event.location = location;
      if (certificateText) event.certificateText = certificateText;
      if (certificateTemplateUrl) event.certificateTemplateUrl = certificateTemplateUrl;
      if (status) event.status = status;

    }

    await event?.save();

    res.json({
      message: "Event Updated Sucessfully!",
      data: event
    });


  } catch (error) {
    console.error("Error fetching all events!", error);
    return res.status(500).json({
      message: "Failed to fetch events!",
    });

  }
}

export { addEvent, getAllEvents, changeEventDetails, deleteEventById, userEvents, eventById };
