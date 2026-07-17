import express from "express";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import { createUserContact, getAllQueries } from "../controllers/contact.js";
import { contact } from "../middleware/limiters.js";

const router = express.Router();

router.post('/', authenticate, authorize("user"), contact, createUserContact);
router.get('/allQueries', authenticate, authorize("admin"), getAllQueries);

export default router;
