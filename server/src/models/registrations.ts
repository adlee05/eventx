import { Schema, model } from "mongoose";

const registrationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    eventId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Event"
    }
  },
  { timestamps: true }
);

registrationSchema.index(
  { userId: 1, eventId: 1 },
  { unique: true }
);

export const RegistrationModel = model("Registration", registrationSchema);
