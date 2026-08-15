import { Document } from 'mongoose';

export interface ICaseStudy extends Document {
  title: string;
  slug: string;
  clientName?: string;
  practiceArea: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  featured?: boolean;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}
