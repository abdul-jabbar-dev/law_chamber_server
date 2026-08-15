import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';
import { IBlog } from '../interfaces/blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    category: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    authorRole: { type: String, required: true },
    date: { type: Date, default: Date.now },
    readTime: { type: String, required: true },
    featured: { type: Boolean, default: false },
    contentHtml: { type: String, required: true },
    takeaways: [{ type: String }],
    quote: { type: String },
  },
  { timestamps: true }
);

// Pre-save hook to automatically generate slug from title
blogSchema.pre('save', async function () {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

export default mongoose.model<IBlog>('Blog', blogSchema);
