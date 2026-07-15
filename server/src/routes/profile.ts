import express from "express";
import { getUpcoming, getPast, updateProfile, getMyEvents } from "../controllers/profile.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();
router.use(authenticate);

router.get('/upcoming', getUpcoming);
router.get('/past', getPast);
router.get('/myEvents', getMyEvents);

router.put('/update', updateProfile);

export default router;
