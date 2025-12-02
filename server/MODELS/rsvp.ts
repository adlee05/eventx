import { Schema, model } from "mongoose";

const RSVPSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId,ref: "User",required: true,},
    event: {type: Schema.Types.ObjectId,ref: "Event",required: true,},
    status: {type: String,enum: ["going", "interested", "not-going"],default: "going", },
  },
  { timestamps: true}
);

export const RSVPModel = model("RSVP", RSVPSchema);
