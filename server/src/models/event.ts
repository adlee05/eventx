import { Schema, model } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    maxParticipants: { type: Number, default: 100 },
    deadDate: { type: Date, required: true },
    category: { type: String, enum: ["recreational", "tech", "art"], default: "recreational" },
    registrationCount: { type: Number, default: 0 },
    archived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const EventModel = model("Event", EventSchema);
