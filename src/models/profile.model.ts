import mongoose, { Schema } from 'mongoose';
import { IProfile } from '../interfaces/profile.interface';

const qualificationSchema = new Schema(
  {
    title: { type: String, required: true },
    institution: { type: String, required: true },
    years: { type: String, required: true },
  },
  { _id: false }
);

const chamberInfoSchema = new Schema(
  {
    location: { type: String, required: false, default: '' },
    morningTime: { type: String, required: false, default: '' },
    eveningTime: { type: String, required: false, default: '' },
    workingDays: { type: String, required: false, default: '' },
    closedDays: { type: String, required: false, default: '' },
  },
  { _id: false }
);

const profileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    biography: { type: String, required: true },
    biographySecondary: { type: String, required: false, default: '' },
    image: { type: String, required: true },
    keyExpertise: [{ type: String }],
    keyAchievements: [{ type: String }],
    qualifications: [qualificationSchema],
    services: [{ type: String }],
    chamberInfo: { type: chamberInfoSchema, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>('Profile', profileSchema);
