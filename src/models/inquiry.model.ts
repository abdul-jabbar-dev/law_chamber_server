import mongoose, { Schema } from "mongoose";
import { IInquiry } from "../interfaces/inquiry.interface";

const inquirySchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    practiceArea: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Reviewed"], default: "Pending" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", inquirySchema);
