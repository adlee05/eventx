import { Request, Response, NextFunction } from "express";

export default function authorize(...allowedRoles: string[]) {
  // return a middleware used by express
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        message: "User not authenticated",
        success: false,
      })

      return;
    }

    if (typeof req.user === "string") {
      res.status(401).json({
        message: "Invalid token payload",
        success: false,
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        message: "Forbidden.",
        success: false,
      })

      return;
    }

    // all good, go to next
    next();
  }
}
