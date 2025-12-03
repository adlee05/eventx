import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true,},
    event: {type: Schema.Types.ObjectId,ref: "Event",required: true,},
    certificateUrl: {type: String, required: true,},},
  { timestamps: true }
);

export const CertificateModel = model("Certificate", CertificateSchema);
