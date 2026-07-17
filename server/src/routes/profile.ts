import express from "express";
import { getUpcoming, getPast, updateProfile, getMyEvents } from "../controllers/profile.js";
import authenticate from "../middleware/authenticate.js";
import { profileLimiter } from "../middleware/limiters.js";

const router = express.Router();

router.get('/upcoming', authenticate, profileLimiter, getUpcoming);
router.get('/past', authenticate, profileLimiter, getPast);
router.get('/myEvents', authenticate, profileLimiter, getMyEvents);

router.put('/update', authenticate, profileLimiter, updateProfile);

export default router;
