import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { EventModel } from "../models/event.js";

const router = express.Router();

router.post("/addEvent", authenticate, async (req, res) => {
  try {

    const { title, description, date, imageUrl, location,
      certificateText, certificateTemplateUrl, status, } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({
        message: "Must fill all required fields!",
      });
    }

    //@ts-ignore
    const userId = req.user.id;

    const event = await EventModel.create({
      title,
      description,
      date,
      location,
      imageUrl,
      certificateText,
      certificateTemplateUrl,
      status,
      createdBy: userId,
      registeredUsers: [],
    });

    return res.status(201).json({
      message: "Event added successfully!",
      event,
    });

  } catch (error) {
    console.error("Error adding Event!", error);
    return res.status(500).json({
      message: "Failed to add Event!",
    });
  }
});

router.get("/userEvents", authenticate, async (req, res) => {

  try {

    //@ts-ignore
    const userId = req.user.id;

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

});

router.get("/events", authenticate, async (req, res) => {
  try {
    const allEvents = await EventModel.find().sort({ date: -1 });

    return res.status(200).json({
      message: "All events fetched successfully!",
      data: allEvents,
    });

  } catch (error) {
    console.error("Error fetching all events!", error);
    return res.status(500).json({
      message: "Failed to fetch events!",
    });
  }
});

router.get("/event/:id", authenticate, async (req, res) => {

  try {

    const { id } = req.params;

    //@ts-ignore
    const userId = req.user.id;

    const event = await EventModel.findOne({ _id: id, userId });

    if (!event) {
      res.status(404).json({
        message: " Event Not Found!"
      })
    }

    res.json({
      message: " Event Fetched Sucessfully!",
      data: event
    });

  } catch (error) {
    console.error("Error fetching Event", error);
    res.status(500).json({
      message: "Failed to fetch Event!",
    });

  }
})

router.put("/event/:id", authenticate, async (req, res) => {

  try {

    const { id } = req.params;
    const { title, description, date, imageUrl, location,
      certificateText, certificateTemplateUrl, status } = req.body;

    //@ts-ignore
    const userId = req.user.id;

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
})

router.delete("/event/:id", authenticate, async (req, res) => {

  try {

    const { id } = req.params;

    const userId = req.user.id;

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
})

export default router;
