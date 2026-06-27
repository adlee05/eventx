import jwt from "jsonwebtoken";
import envs from "../config/index.js";

//types
import type { Request, Response, NextFunction } from "express";
import { type VerifyErrors, JwtPayload } from "jsonwebtoken";
import { userJwtPayload } from "../types/jwt.js";

function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.auth_token;

  if (!envs.jwt_secret) {
    throw new Error("JWT secret not configured");
  }

  jwt.verify(token, envs.jwt_secret, (err: VerifyErrors | null, decoded: string | undefined | JwtPayload) => {
    if (err || !decoded || typeof decoded == "string") {
      res.status(401).json({
        message: "Invalid user.",
        success: false
      });

      return;
    }

    req.user = decoded as userJwtPayload;
    next();
  });
}

export default authenticate;
