import mongoose, { Schema, model } from "mongoose";

if (mongoose.models.User) {
  delete mongoose.models.User;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String },

    role: { type: String, enum: ["user", "admin"], default: "user", },

    profileImage: { type: String },
    phoneNumber: { type: String },
    bio: { type: String },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
