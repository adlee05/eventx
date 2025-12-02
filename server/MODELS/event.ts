import { Schema, model } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: {type: String},
    date: { type: Date, required: true },
    location: { type: String, required: true },
    imageUrl:{type: String} ,
    createdBy: {type: Schema.Types.ObjectId,ref: "User",},
    registeredUsers: [{type: Schema.Types.ObjectId,ref: "User",},],
    attendees: [{type: Schema.Types.ObjectId,ref: "User", },],
    certificateTemplateUrl: { type: String },
    
    status: {type: String,enum: ["upcoming", "completed", "cancelled"],default: "upcoming",},
    certificateText: { type: String },
  },
  { timestamps: true }
);

export const EventModel = model("Event", EventSchema);
