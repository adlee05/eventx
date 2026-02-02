import mongoose, { Schema, model } from "mongoose";

if (mongoose.models.User) {
  delete mongoose.models.User;
}

 const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    firstname: {type: String},
    lastname: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: { type: String, enum: ["user", "admin"], default: "user", },

    profileImage: { type: String },
    phoneNumber: { type: String },
    bio: { type: String },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },

    attendedEvents: [{ type: Schema.Types.ObjectId, ref: "Event", },],
    savedEvents: [{ type: Schema.Types.ObjectId, ref: "Event", },],

    certificates: [{ type: Schema.Types.ObjectId, ref: "Certificate", },],
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
