import { Schema, model } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    maxParticipants: { type: Number, default: 100 },
    deadDate: { type: Date },
    category: { type: String, enum: ["recreational", "tech", "art"], default: "recreational" },
    registrationCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const EventModel = model("Event", EventSchema);
