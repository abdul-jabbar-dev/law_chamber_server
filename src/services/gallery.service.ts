import Gallery from '../models/gallery.model';
import { IGalleryItem } from '../interfaces/gallery.interface';
import cloudinary from '../config/cloudinary';

// Reuse upload stream logic
export const uploadImageToCloudinary = async (fileBuffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (result) return resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const deleteImageFromCloudinary = async (imageUrl: string): Promise<void> => {
  try {
    const regex = /\/v\d+\/(.+)\.\w+$/;
    const match = imageUrl.match(regex);
    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", error);
  }
};

export const createGalleryItem = async (data: Partial<IGalleryItem>): Promise<IGalleryItem> => {
  const item = new Gallery(data);
  return await item.save();
};

export const getAllGalleryItems = async (): Promise<IGalleryItem[]> => {
  return await Gallery.find().sort({ createdAt: -1 });
};

export const deleteGalleryItem = async (id: string): Promise<IGalleryItem | null> => {
  const item = await Gallery.findById(id);
  if (!item) return null;

  if (item.image) {
    await deleteImageFromCloudinary(item.image);
  }

  return await Gallery.findByIdAndDelete(id);
};
