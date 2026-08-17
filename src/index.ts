import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import blogRoutes from './routes/blog.route';
import galleryRoutes from './routes/gallery.routes';
import caseStudyRoutes from './routes/caseStudy.routes';
import profileRoutes from './routes/profile.routes';
import teamMemberRoutes from './routes/teamMember.routes';
import inquiryRoutes from './routes/inquiry.routes';
import testimonialRoutes from './routes/testimonial.routes';
import settingRoutes from './routes/setting.routes';
import appointmentRoutes from './routes/appointment.routes';
import env from './env';



const app: Express = express();
const PORT = env.PORT;

// Middleware 
app.use(cors({
  origin: ["https://law-chamber-kappa.vercel.app", "https://law-chamber-kappa.vercel.app/*", "http://localhost:3000", "http://localhost:3000/*", "http://localhost:5000", "http://localhost:5000/*"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const MONGODB_URI = env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// API Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/team-members', teamMemberRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/appointments', appointmentRoutes);

// Health check Route
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running and MVC architecture is active!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
