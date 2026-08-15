import { Request, Response } from 'express';
import Setting from '../models/setting.model';

export const getSettings = async (req: Request, res: Response): Promise<any> => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response): Promise<any> => {
  try {
    const { socialLinks, officeInfo, chamberInfo, timeSlots } = req.body;
    
    let settings = await Setting.findOne();
    
    if (settings) {
      settings.socialLinks = socialLinks || settings.socialLinks;
      settings.officeInfo = officeInfo || settings.officeInfo;

      settings.chamberInfo = chamberInfo || settings.chamberInfo;
      settings.timeSlots = timeSlots || settings.timeSlots;
      await settings.save();
    } else {
      settings = await Setting.create({ socialLinks, officeInfo, chamberInfo, timeSlots });
    }
    
    res.status(200).json({ success: true, data: settings, message: 'Settings updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
