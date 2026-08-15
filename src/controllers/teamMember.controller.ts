import { Request, Response } from 'express';
import * as teamMemberService from '../services/teamMember.service';

export const createTeamMember = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, role, isKeyPartner } = req.body;
    
    if (!name || !role) {
      return res.status(400).json({ success: false, message: 'Name and role are required.' });
    }

    let imageUrl = '';
    if (req.file) {
      imageUrl = await teamMemberService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/team');
    } else {
      return res.status(400).json({ success: false, message: 'Image is required for a team member.' });
    }

    const data = {
      ...req.body,
      isKeyPartner: isKeyPartner === 'true' || isKeyPartner === true,
      image: imageUrl
    };

    const newMember = await teamMemberService.createTeamMember(data);
    res.status(201).json({ success: true, data: newMember });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTeamMembers = async (req: Request, res: Response): Promise<any> => {
  try {
    const members = await teamMemberService.getAllTeamMembers();
    res.status(200).json({ success: true, data: members });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTeamMember = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const member = await teamMemberService.getTeamMemberById(id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.status(200).json({ success: true, data: member });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTeamMember = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };
    
    if (req.file) {
      const imageUrl = await teamMemberService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/team');
      updateData.image = imageUrl;
    }
    
    if (updateData.isKeyPartner !== undefined) {
      updateData.isKeyPartner = updateData.isKeyPartner === 'true' || updateData.isKeyPartner === true;
    }

    const updatedMember = await teamMemberService.updateTeamMember(id, updateData);
    if (!updatedMember) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    
    res.status(200).json({ success: true, data: updatedMember });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTeamMember = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deleted = await teamMemberService.deleteTeamMember(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.status(200).json({ success: true, message: 'Team member deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderTeamMembers = async (req: Request, res: Response): Promise<any> => {
  try {
    const { updates } = req.body;
    if (!Array.isArray(updates)) {
      return res.status(400).json({ success: false, message: 'Updates must be an array' });
    }
    await teamMemberService.updateTeamMemberOrder(updates);
    res.status(200).json({ success: true, message: 'Order updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
