import { Schema, model } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String },
    createdBy: { type: String },
    registeredUsers: [{ type: Schema.Types.ObjectId, ref: "User", },],
    attendees: [{ type: Schema.Types.ObjectId, ref: "User", },],
    certificateTemplateUrl: { type: String },
    maxParticipants: { type: Number },
    registrationDeadline: { type: Date },

    status: { type: String, enum: ["upcoming", "completed", "cancelled"], default: "upcoming", },
    category: {type: String, enum: ["recreational", "tech", "art"], default: "recreational"},
    certificateText: { type: String },
  },
  { timestamps: true }
);

export const EventModel = model("Event", EventSchema);
