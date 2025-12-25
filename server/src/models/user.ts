import { Schema, model } from "mongoose";
const UserSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {type: String,enum: ["user", "admin"],default: "user",},

    profileImage: { type: String },
    phoneNumber: { type: String },
    bio: { type: String },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },

    attendedEvents: [{type: Schema.Types.ObjectId,ref: "Event",},],

    savedEvents: [{type: Schema.Types.ObjectId,ref: "Event",},],

    certificates: [{type: Schema.Types.ObjectId,ref: "Certificate",},],
},
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
