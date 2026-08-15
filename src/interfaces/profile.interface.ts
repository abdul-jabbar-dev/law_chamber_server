import { Document } from 'mongoose';

export interface IQualification {
  title: string;
  institution: string;
  years: string;
}

export interface IChamberInfo {
  location: string;
  morningTime: string;
  eveningTime: string;
  workingDays: string;
  closedDays: string;
}

export interface IProfile extends Document {
  name: string;
  role: string;
  subtitle: string;
  description: string;
  biography: string;
  biographySecondary: string;
  image: string;
  keyExpertise: string[];
  keyAchievements: string[];
  qualifications: IQualification[];
  services: string[];
  chamberInfo?: IChamberInfo;
  createdAt: Date;
  updatedAt: Date;
}
