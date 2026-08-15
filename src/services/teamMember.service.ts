import TeamMember from '../models/teamMember.model';
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

export const createTeamMember = async (data: any) => {
  const member = new TeamMember(data);
  return await member.save();
};

export const getAllTeamMembers = async () => {
  return await TeamMember.find().sort({ order: 1, createdAt: -1 });
};

export const getTeamMemberById = async (id: string) => {
  return await TeamMember.findById(id);
};

export const updateTeamMember = async (id: string, updateData: any) => {
  return await TeamMember.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteTeamMember = async (id: string) => {
  return await TeamMember.findByIdAndDelete(id);
};

export const updateTeamMemberOrder = async (updates: { id: string, order: number }[]) => {
  const operations = updates.map(update => ({
    updateOne: {
      filter: { _id: update.id },
      update: { $set: { order: update.order } }
    }
  }));
  return await TeamMember.bulkWrite(operations);
};
