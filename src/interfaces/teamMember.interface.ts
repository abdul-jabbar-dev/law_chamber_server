import { Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  role: string;
  image: string;
  phone?: string;
  email?: string;
  isKeyPartner: boolean;
  firmValues?: string;
  trackRecord?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
