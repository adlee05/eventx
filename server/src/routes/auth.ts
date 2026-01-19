import express from "express";
import { login, signup, logout, me } from "../controllers/auth.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);
router.get('/me', authenticate, me);

export default router;
