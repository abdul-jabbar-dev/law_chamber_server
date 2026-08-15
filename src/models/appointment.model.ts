import mongoose, { Schema } from "mongoose";
import { IAppointment } from "../interfaces/appointment.interface";

const appointmentSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false, default: "" },
    preferredDate: { type: String, required: false, default: "" },
    preferredTime: { type: String, required: false, default: "" },
    practiceArea: { type: String, required: false, default: "" },
    contactOption: { type: String, required: true },
    notes: { type: String, required: false, default: "" },
    status: { type: String, enum: ["Pending", "Reviewed"], default: "Pending" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", appointmentSchema);
