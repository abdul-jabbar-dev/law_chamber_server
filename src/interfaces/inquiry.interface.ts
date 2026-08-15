import { Document } from "mongoose";

export interface IInquiry extends Document {
  fullName: string;
  email: string;
  phone: string;
  practiceArea: string;
  message: string;
  status: "Pending" | "Reviewed";
  createdAt: Date;
  updatedAt: Date;
}
