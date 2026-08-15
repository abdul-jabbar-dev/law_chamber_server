import { Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;
  author: string;
  authorRole: string;
  date: Date;
  readTime: string;
  featured: boolean;
  contentHtml: string;
  takeaways: string[];
  quote: string;
}
