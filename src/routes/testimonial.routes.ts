import express from 'express';
import * as testimonialController from '../controllers/testimonial.controller';
import { protect } from '../utils/jwt';
import upload from '../utils/multer';

const router = express.Router();

router.get('/', testimonialController.getTestimonials);
router.post('/', upload.single('image'), testimonialController.createTestimonial);
router.delete('/:id', protect, testimonialController.deleteTestimonial);

export default router;
