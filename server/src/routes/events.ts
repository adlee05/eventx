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
  archiveEvent,
  editEvent,
  getRegistrations,
  removeRegistration
} from "../controllers/events.js";

const router = express.Router();

router.get("/allEvents", getAllEvents);
router.get("/:id", optionalAuth, eventById);
router.get("/:id/registrations", authenticate, getRegistrations);

router.post("/register", authenticate, register);
router.post("/addEvent", authenticate, addEvent);

router.delete("/deleteRegistration", authenticate, deleteRegistration);
router.delete("/:id/removeRegistration/:userId", authenticate, removeRegistration);

router.patch("/:id/archive", authenticate, archiveEvent);
router.patch("/:id/edit", authenticate, editEvent);

export default router;
