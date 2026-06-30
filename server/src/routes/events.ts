import express from "express";
import authenticate from "../middleware/authenticate.js";
import { EventModel } from "../models/event.js";
import {
  addEvent,
  getAllEvents,
  eventById,
  register,
  deleteRegistration
} from "../controllers/events.js";

const router = express.Router();

router.get("/allEvents", getAllEvents);
router.get("/:id", eventById);

router.post("/register", authenticate, register);
router.post("/addEvent", authenticate, addEvent);

router.delete("/deleteRegistration", authenticate, deleteRegistration);

export default router;
