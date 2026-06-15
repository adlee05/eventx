import { Schema, model } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String },
    createdBy: { type: String },
    registeredUsers: [{ type: Schema.Types.ObjectId, ref: "User", },],
    maxParticipants: { type: Number },
    deadDate: { type: Date },
    category: { type: String, enum: ["recreational", "tech", "art"], default: "recreational" },
  },
  { timestamps: true }
);

export const EventModel = model("Event", EventSchema);
