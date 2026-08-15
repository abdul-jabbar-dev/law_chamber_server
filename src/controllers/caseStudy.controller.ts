import { Request, Response } from 'express';
import * as caseStudyService from '../services/caseStudy.service';

export const createCaseStudy = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, clientName, practiceArea, challenge, solution, result, featured } = req.body;
    
    if (!title || !practiceArea || !challenge || !solution || !result) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    let imageUrl = '';
    if (req.file) {
      imageUrl = await caseStudyService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/case_studies');
    } else {
      return res.status(400).json({ success: false, message: 'Image is required for a case study.' });
    }

    const newCaseStudy = await caseStudyService.createCaseStudy({
      title,
      clientName,
      practiceArea,
      challenge,
      solution,
      result,
      featured: featured === 'true' || featured === true,
      image: imageUrl
    });
    
    res.status(201).json({ success: true, data: newCaseStudy });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCaseStudies = async (req: Request, res: Response): Promise<any> => {
  try {
    const caseStudies = await caseStudyService.getAllCaseStudies();
    res.status(200).json({ success: true, data: caseStudies });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCaseStudyBySlug = async (req: Request, res: Response): Promise<any> => {
  try {
    const { slug } = req.params;
    const caseStudy = await caseStudyService.getCaseStudyBySlug(slug as string);
    
    if (!caseStudy) {
      return res.status(404).json({ success: false, message: 'Case study not found' });
    }
    
    res.status(200).json({ success: true, data: caseStudy });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCaseStudy = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deletedItem = await caseStudyService.deleteCaseStudy(id as string);
    
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Case study not found' });
    }
    
    res.status(200).json({ success: true, message: 'Case study deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCaseStudy = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };
    
    // Handle image update if present
    if (req.file) {
      const imageUrl = await caseStudyService.uploadImageToCloudinary(req.file.buffer, 'case-studies');
      updateData.image = imageUrl;
    }
    
    if (updateData.featured === 'true' || updateData.featured === true) {
      updateData.featured = true;
    } else {
      updateData.featured = false;
    }

    const updatedCaseStudy = await caseStudyService.updateCaseStudy(id as string, updateData);
    if (!updatedCaseStudy) {
      return res.status(404).json({ success: false, message: 'Case study not found' });
    }
    
    res.status(200).json({ success: true, data: updatedCaseStudy });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderCaseStudies = async (req: Request, res: Response): Promise<any> => {
  try {
    const { updates } = req.body; // Expects an array of { id, order }
    
    if (!Array.isArray(updates)) {
      return res.status(400).json({ success: false, message: 'Updates must be an array' });
    }

    await caseStudyService.updateCaseStudyOrder(updates);
    
    res.status(200).json({ success: true, message: 'Case studies reordered successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
