import Testimonial from '../models/testimonial.model';
import cloudinary from '../config/cloudinary';

export const uploadImageToCloudinary = (fileBuffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (result) resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const createTestimonial = async (data: any) => {
  return await Testimonial.create(data);
};

export const getTestimonials = async () => {
  return await Testimonial.find().sort({ createdAt: -1 });
};

export const deleteTestimonial = async (id: string) => {
  return await Testimonial.findByIdAndDelete(id);
};
