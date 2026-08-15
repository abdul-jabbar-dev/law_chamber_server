import Blog from '../models/blog.model';
import { IBlog } from '../interfaces/blog.interface';
import cloudinary from '../config/cloudinary';

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

export const createBlog = async (blogData: Partial<IBlog>): Promise<IBlog> => {
  const blog = new Blog(blogData);
  return await blog.save();
};

export const getAllBlogs = async (): Promise<IBlog[]> => {
  return await Blog.find().sort({ createdAt: -1 });
};

export const getBlogBySlug = async (slug: string): Promise<IBlog | null> => {
  return await Blog.findOne({ slug });
};

export const deleteImageFromCloudinary = async (imageUrl: string): Promise<void> => {
  try {
    // Cloudinary URLs: https://res.cloudinary.com/cloud_name/image/upload/v12345/folder/filename.png
    // We want to extract 'folder/filename'
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

export const updateBlogBySlug = async (slug: string, updateData: Partial<IBlog>): Promise<IBlog | null> => {
  const blog = await Blog.findOne({ slug });
  if (!blog) return null;

  // If a new image is being uploaded, delete the old one from Cloudinary
  if (updateData.image && blog.image && updateData.image !== blog.image) {
    await deleteImageFromCloudinary(blog.image);
  }

  Object.assign(blog, updateData);
  return await blog.save();
};

export const deleteBlogBySlug = async (slug: string): Promise<IBlog | null> => {
  const blog = await Blog.findOne({ slug });
  if (!blog) return null;

  if (blog.image) {
    await deleteImageFromCloudinary(blog.image);
  }
  
  // Note: If you also want to parse `blog.contentHtml` to find inline images and delete them, 
  // you can do it here, but typically deleting the cover image is the primary concern.

  return await Blog.findOneAndDelete({ slug });
};
