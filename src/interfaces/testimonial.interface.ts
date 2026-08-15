import { Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  image: string;
  rating: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
