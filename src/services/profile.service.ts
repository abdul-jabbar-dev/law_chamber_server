import Profile from '../models/profile.model';
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

export const getProfile = async () => {
  let profile = await Profile.findOne();
  return profile;
};

export const updateProfile = async (updateData: any) => {
  let profile = await Profile.findOne();
  if (profile) {
    profile = await Profile.findByIdAndUpdate(profile._id, updateData, { new: true });
  } else {
    profile = await Profile.create(updateData);
  }
  return profile;
};
