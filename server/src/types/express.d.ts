import { userJwtPayload } from "./jwt.ts"

declare global {
  namespace Express {
    interface Request {
      user: userJwtPayload
    }
  }
}
