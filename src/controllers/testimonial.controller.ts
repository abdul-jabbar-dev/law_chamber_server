import { Request, Response } from 'express';
import * as testimonialService from '../services/testimonial.service';

export const createTestimonial = async (req: Request, res: Response): Promise<any> => {
  try {
    const testimonialData = { ...req.body };

    if (req.file) {
      const imageUrl = await testimonialService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/testimonials');
      testimonialData.image = imageUrl;
    }

    const testimonial = await testimonialService.createTestimonial(testimonialData);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTestimonials = async (req: Request, res: Response): Promise<any> => {
  try {
    const testimonials = await testimonialService.getTestimonials();
    res.status(200).json({ success: true, data: testimonials });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;
    const testimonial = await testimonialService.deleteTestimonial(id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
