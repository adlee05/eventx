import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { connectDB } from "../config/db.ts";

function login(req, res) {
  const { identifier, password } = req.body;
}

function signup(req, res) {
  const { email, username, password } = req.body;
}

export { login, signup };
