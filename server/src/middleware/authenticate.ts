import jwt from "jsonwebtoken";
import envs from "../config/index.js";
import { UserModel } from "../models/user.js";

//types
import type { Request, Response, NextFunction } from "express";
import { type VerifyErrors, JwtPayload } from "jsonwebtoken";
import { userJwtPayload } from "../types/jwt.js";

async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.auth_token;

  if (!envs.jwt_secret) {
    throw new Error("JWT secret not configured");
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please sign in to continue.",
    });
  }

  jwt.verify(token, envs.jwt_secret, async (err: VerifyErrors | null, decoded: string | undefined | JwtPayload) => {
    if (err || !decoded || typeof decoded == "string") {
      return res.status(401).json({
        message: "Invalid user.",
        success: false
      });
    }

    try {
      const user = await UserModel.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({
          message: "User no longer exists",
          success: false
        })
      }
    } catch (e) {
      console.log(e);

      return res.status(500).json({
        message: "Internal Server Error",
        success: false
      })
    }

    req.user = decoded as userJwtPayload;

    next();
  });
}

export default authenticate;
