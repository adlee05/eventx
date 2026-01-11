import jwt from "jsonwebtoken";
import envs from "../config/index.js";
//types
import type { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.auth_token;

  if (!envs.jwt_secret) {
    throw new Error("JWT secret not configured");
  }

  jwt.verify(token, envs.jwt_secret, (err: Error | null, decoded: JwtPayload | string | undefined) => {
    if (err) {
      res.status(401).json({
        message: "Invalid user.",
        success: false
      });

      return;
    }

    req.user = decoded;
    next();
  });
}

export default authenticate;
