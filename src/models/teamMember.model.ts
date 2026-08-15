import mongoose, { Schema } from 'mongoose';
import { ITeamMember } from '../interfaces/teamMember.interface';

const teamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    isKeyPartner: { type: Boolean, default: false },
    firmValues: { type: String },
    trackRecord: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);
