import mongoose, { Schema, model } from "mongoose";

const ContactSchema = new Schema(
  {
    issue: { type: String, required: true, },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

export const userContactModel = model("userContact", ContactSchema);
