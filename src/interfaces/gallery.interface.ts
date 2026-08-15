import { Document } from 'mongoose';

export interface IGalleryItem extends Document {
  title: string;
  description?: string;
  image: string; // Cloudinary secure URL
  createdAt: Date;
  updatedAt: Date;
}
