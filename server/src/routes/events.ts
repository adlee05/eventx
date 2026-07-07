import express from "express";
import authenticate from "../middleware/authenticate.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
import { EventModel } from "../models/event.js";
import {
  addEvent,
  getAllEvents,
  eventById,
  register,
  deleteRegistration,
  archiveEvent
} from "../controllers/events.js";

const router = express.Router();

router.get("/allEvents", getAllEvents);
router.get("/:id", optionalAuth, eventById);

router.post("/register", authenticate, register);
router.post("/addEvent", authenticate, addEvent);

router.delete("/deleteRegistration", authenticate, deleteRegistration);

router.patch("/:id/archive", authenticate, archiveEvent);

export default router;
