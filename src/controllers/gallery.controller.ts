import { Request, Response } from 'express';
import * as galleryService from '../services/gallery.service';

export const createGalleryItem = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required.' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required for the gallery.' });
    }

    const imageUrl = await galleryService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/gallery');
    
    const newItem = await galleryService.createGalleryItem({
      title,
      description,
      image: imageUrl
    });
    
    res.status(201).json({ success: true, data: newItem });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllGalleryItems = async (req: Request, res: Response): Promise<any> => {
  try {
    const items = await galleryService.getAllGalleryItems();
    res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deletedItem = await galleryService.deleteGalleryItem(id as string);
    
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    
    res.status(200).json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
