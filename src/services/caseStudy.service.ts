import CaseStudy from '../models/caseStudy.model';
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

export const createCaseStudy = async (data: any) => {
  const caseStudy = new CaseStudy(data);
  return await caseStudy.save();
};

export const getAllCaseStudies = async () => {
  return await CaseStudy.find().sort({ order: 1, createdAt: -1 });
};

export const getCaseStudyBySlug = async (slug: string) => {
  return await CaseStudy.findOne({ slug });
};

export const updateCaseStudy = async (id: string, updateData: any) => {
  return await CaseStudy.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteCaseStudy = async (id: string) => {
  return await CaseStudy.findByIdAndDelete(id);
};

export const updateCaseStudyOrder = async (updates: { id: string, order: number }[]) => {
  const operations = updates.map(update => ({
    updateOne: {
      filter: { _id: update.id },
      update: { $set: { order: update.order } }
    }
  }));
  return await CaseStudy.bulkWrite(operations);
};
