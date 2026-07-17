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
import { publicRoutes, registerForEvent, deregister, createEventLimiter, editEventLimiter } from "../middleware/limiters.js";

const router = express.Router();

router.get("/allEvents", publicRoutes, getAllEvents);
router.get("/:id", optionalAuth, publicRoutes, eventById);
router.get("/:id/registrations", authenticate, getRegistrations);

router.post("/register", authenticate, registerForEvent, register);
router.post("/addEvent", authenticate, createEventLimiter, addEvent);

router.delete("/deleteRegistration", authenticate, deleteRegistration);
router.delete("/:id/removeRegistration/:userId", authenticate, removeRegistration);

router.patch("/:id/archive", authenticate, archiveEvent);
router.patch("/:id/edit", authenticate, editEventLimiter, editEvent);

export default router;
