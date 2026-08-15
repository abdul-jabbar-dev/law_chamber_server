import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';
import { ICaseStudy } from '../interfaces/caseStudy.interface';

const caseStudySchema = new Schema<ICaseStudy>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    clientName: { type: String },
    practiceArea: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    result: { type: String, required: true },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Pre-save hook to automatically generate slug from title
caseStudySchema.pre('save', async function () {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

export default mongoose.model<ICaseStudy>('CaseStudy', caseStudySchema);
