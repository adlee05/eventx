import mongoose from "mongoose";
import * as z from "zod";

export const registrationSchema = z.object({
  eventId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid Event Id")
})
