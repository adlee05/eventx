import express from "express";
import authenticate from "../middleware/authenticate.js";
import { EventModel } from "../models/event.js";
import {
  addEvent,
  getAllEvents,
  eventById,
  register
} from "../controllers/events.js";

const router = express.Router();

router.post("/addEvent", authenticate, addEvent);
router.get("/allEvents", getAllEvents);
router.get("/:id", eventById);
router.post("/register", authenticate, register)

export default router;
