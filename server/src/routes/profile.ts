import express from "express";
import { getUpcoming, getPast, updateProfile, getMyEvents } from "../controllers/profile.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();
router.use(authenticate);

router.get('/upcoming', authenticate, getUpcoming);
router.get('/past', authenticate, getPast);
router.get('/myEvents', authenticate, getMyEvents);

router.put('/update', authenticate, updateProfile);

export default router;
