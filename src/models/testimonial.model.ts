import mongoose, { Schema } from 'mongoose';
import { ITestimonial } from '../interfaces/testimonial.interface';

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    image: { type: String, required: false, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
