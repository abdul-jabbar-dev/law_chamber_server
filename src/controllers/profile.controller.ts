import { Request, Response } from 'express';
import * as profileService from '../services/profile.service';

export const getProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const profile = await profileService.getProfile();

    // If no profile found, return a default one
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    
    res.status(200).json({ success: true, data: profile });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    let updateData = { ...req.body };
    
    // Parse JSON strings back to arrays/objects if they come from formData
    if (updateData.keyExpertise && typeof updateData.keyExpertise === 'string') {
      updateData.keyExpertise = JSON.parse(updateData.keyExpertise);
    }
    if (updateData.keyAchievements && typeof updateData.keyAchievements === 'string') {
      updateData.keyAchievements = JSON.parse(updateData.keyAchievements);
    }
    if (updateData.qualifications && typeof updateData.qualifications === 'string') {
      updateData.qualifications = JSON.parse(updateData.qualifications);
    }
    if (updateData.services && typeof updateData.services === 'string') {
      updateData.services = JSON.parse(updateData.services);
    }
    if (updateData.chamberInfo && typeof updateData.chamberInfo === 'string') {
      updateData.chamberInfo = JSON.parse(updateData.chamberInfo);
    }
    
    // Handle image update if present
    if (req.file) {
      const imageUrl = await profileService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/profile');
      updateData.image = imageUrl;
    }
    
    const updatedProfile = await profileService.updateProfile(updateData);
    
    res.status(200).json({ success: true, data: updatedProfile });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
