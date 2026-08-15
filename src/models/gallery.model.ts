import mongoose, { Schema } from 'mongoose';
import { IGalleryItem } from '../interfaces/gallery.interface';

const gallerySchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IGalleryItem>('Gallery', gallerySchema);
