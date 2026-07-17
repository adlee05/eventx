import { Request } from "express";
import rateLimit from "express-rate-limit";
import { success } from "zod/mini";
import { me } from "../controllers/auth.js";

const message = {
  message: "Too many attempts in a while, try again later",
  success: false
}

const hour = 60 * 60 * 1000;
const minute = 1 * 60 * 1000;

const loginLimiter = rateLimit({
  windowMs: minute,
  keyGenerator: (req: Request) => `${req.ip}:${req.body.email}`,
  max: 5,
  message: message
});

const createEventLimiter = rateLimit({
  windowMs: hour,
  keyGenerator: (req: Request) => `${req.ip}:${req.user.userId}`,
  max: 10,
  message: message
})

const editEventLimiter = rateLimit({
  windowMs: hour,
  keyGenerator: (req: Request) => `${req.ip}:${req.user.userId}`,
  max: 30,
  message: message
})

const registerForEvent = rateLimit({
  windowMs: hour,
  keyGenerator: (req: Request) => `${req.ip}:${req.user.userId}`,
  max: 10,
  message: message
})

const deregister = rateLimit({
  windowMs: hour,
  keyGenerator: (req: Request) => `${req.ip}:${req.user.userId}`,
  max: 30,
  message: message
})

const publicRoutes = rateLimit({
  windowMs: hour,
  max: 2000,
  message: message
})

const contact = rateLimit({
  windowMs: hour,
  max: 1,
  message: message,
  keyGenerator: (req: Request) => `${req.ip}:${req.user.userId}`,
})

const profileLimiter = rateLimit({
  windowMs: minute,
  max: 60,
  message: message,
  keyGenerator: (req: Request) => `${req.ip}:${req.user.userId}`,
})

export {
  loginLimiter,
  createEventLimiter,
  editEventLimiter,
  registerForEvent,
  deregister,
  publicRoutes,
  contact,
  profileLimiter
};
