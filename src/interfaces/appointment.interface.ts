import { Document } from "mongoose";

export interface IAppointment extends Document {
  fullName: string;
  phone: string;
  email?: string;
  preferredDate?: string;
  preferredTime?: string;
  practiceArea?: string;
  contactOption: string;
  notes?: string;
  status: string;
}
