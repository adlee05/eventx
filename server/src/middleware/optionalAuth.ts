import { type Request, type Response, type NextFunction } from "express";
import { UserModel } from "../models/user.js";
import { type VerifyErrors, JwtPayload } from "jsonwebtoken";
import { userJwtPayload } from "../types/jwt.js";
import envs from "../config/index.js";
import jwt from "jsonwebtoken";


async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.auth_token;

  if (!token) { // simply calling next won't halt execution
    return next();
  }

  jwt.verify(token, envs.jwt_secret, async (err: VerifyErrors | null, decoded: string | undefined | JwtPayload) => {
    if (err || !decoded || typeof decoded == "string") {
      return next(); // invalid token users are also 'guest' users
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

export { optionalAuth };
