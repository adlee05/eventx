import { Request, Response } from "express";
import { UserModel } from "../models/user.js";
import { RegistrationModel } from "../models/registrations.js";
import { EventModel } from "../models/event.js";

async function getUpcoming(req: Request, res: Response) {
  try {
    const registrations = await RegistrationModel
      .find({
        userId: req.user.userId,
      })
      .populate({
        path: "eventId",
        select: "title description category imageUrl location startDate _id",
        match: {
          startDate: { $gt: new Date() }
        }
      });

    const upcomingEvents = registrations.filter((e) => e.eventId !== null);

    return res.status(200).json({
      message: "Events fetched successfully",
      success: true,
      data: upcomingEvents
    })
  } catch (e) {
    console.error(e)

    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    })
  }
}

async function getPast(req: Request, res: Response) {
  try {
    const registrations = await RegistrationModel
      .find({
        userId: req.user.userId,
      })
      .populate({
        path: "eventId",
        select: "title description category imageUrl location startDate _id",
        match: {
          startDate: { $lt: new Date() }
        }
      });

    const pastEvents = registrations.filter((e) => e.eventId !== null);

    return res.status(200).json({
      message: "Events fetched successfully",
      success: true,
      data: pastEvents
    })
  } catch (e) {
    console.error(e)

    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    })
  }
}

async function updateProfile(req: Request, res: Response) {
  try {
    const userId = req.user.userId;
    const { fName, lName, bio, username, location } = req.body

    const inputs: any = {};

    if (fName) inputs.firstname = fName;
    if (lName) inputs.lastname = lName;
    if (bio) inputs.bio = bio;
    if (username) inputs.username = username;
    if (location) inputs.location = location;


    if (Object.keys(inputs).length == 0) {
      return res.status(400).json({
        message: "Empty fields, try better",
        success: false
      })
    }

    const usernameExists = await UserModel.exists({ username: inputs.username });
    if (usernameExists) {
      return res.status(409).json({
        message: "Username must be unique",
        success: false
      })
    }

    await UserModel.findByIdAndUpdate(
      userId,
      inputs
    );

    return res.status(200).json({
      message: "updated successfully",
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: "Update failed",
      success: false
    });
  }
}

async function getMyEvents(req: Request, res: Response) {
  try {
    const myEvents = await EventModel
      .find({ createdBy: req.user.userId })
      .select("title description category imageUrl location startDate _id archived")
      .sort({ startDate: -1 })

    return res.status(200).json({
      message: "Events fetched successfully",
      success: true,
      data: myEvents
    })

  } catch (e) {
    console.error(e);

    res.status(500).json({
      message: "Failed to fetch Event!",
      success: false
    });
  }
}

export { getUpcoming, getPast, getMyEvents, updateProfile }
