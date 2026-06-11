import express from "express";
import authenticate from "../middleware/authenticate.js";
import { EventModel } from "../models/event.js";
import { addEvent, 
  getAllEvents, 
  eventById 
} from "../controllers/events.js";

const router = express.Router();

router.post("/addEvent", authenticate, addEvent);
router.get("/allEvents", getAllEvents);
router.get("/:id", eventById);

export default router;
