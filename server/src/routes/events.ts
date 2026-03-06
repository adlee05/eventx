import express from "express";
import authenticate from "../middleware/authenticate.js";
import { EventModel } from "../models/event.js";
import { addEvent, 
  getAllEvents, 
  changeEventDetails, 
  deleteEventById, 
  userEvents, 
  eventById 
} from "../controllers/events.js";

const router = express.Router();

router.post("/addEvent", authenticate, addEvent);
router.get("/userEvents", authenticate, userEvents);
router.get("/allEvents", getAllEvents);
router.get("/:id", authenticate, eventById);
router.put("/:id", authenticate, changeEventDetails);
router.delete("/event/:id", authenticate, deleteEventById);

export default router;
