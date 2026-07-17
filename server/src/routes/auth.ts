import express from "express";
import { login, signup, logout, me } from "../controllers/auth.js";
import authenticate from "../middleware/authenticate.js";
import { loginLimiter, publicRoutes } from "../middleware/limiters.js";

const router = express.Router();

router.post('/login', loginLimiter, login);
router.post('/signup', publicRoutes, signup);
router.get('/logout', logout);
router.get('/me', authenticate, me);

export default router;
