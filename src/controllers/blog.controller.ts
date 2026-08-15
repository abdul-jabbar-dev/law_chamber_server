import { Request, Response } from 'express';
import * as blogService from '../services/blog.service';

export const createBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const blogData = { ...req.body };
    
    // Parse JSON strings back to arrays if sent as FormData
    if (typeof blogData.takeaways === 'string') {
      try {
        blogData.takeaways = JSON.parse(blogData.takeaways);
      } catch (e) {
        blogData.takeaways = [blogData.takeaways];
      }
    }
    
    // Convert string 'true'/'false' to boolean for featured
    if (typeof blogData.featured === 'string') {
        blogData.featured = blogData.featured === 'true';
    }

    if (req.file) {
      const imageUrl = await blogService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/blogs');
      blogData.image = imageUrl;
    } else if (!blogData.image) {
      return res.status(400).json({ success: false, message: 'Image is required for the blog.' });
    }

    const newBlog = await blogService.createBlog(blogData);
    res.status(201).json({ success: true, data: newBlog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req: Request, res: Response): Promise<any> => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.status(200).json({ success: true, data: blogs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogBySlug = async (req: Request, res: Response): Promise<any> => {
  try {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    const blog = await blogService.getBlogBySlug(slug as string);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const updateData = { ...req.body };
    
    if (typeof updateData.takeaways === 'string') {
      try {
        updateData.takeaways = JSON.parse(updateData.takeaways);
      } catch (e) {
        updateData.takeaways = [updateData.takeaways];
      }
    }
    
    if (typeof updateData.featured === 'string') {
        updateData.featured = updateData.featured === 'true';
    }

    if (req.file) {
      const imageUrl = await blogService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/blogs');
      updateData.image = imageUrl;
    }

    const updatedBlog = await blogService.updateBlogBySlug(req.params.slug as string, updateData);
    if (!updatedBlog) return res.status(404).json({ success: false, message: 'Blog not found' });

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const deletedBlog = await blogService.deleteBlogBySlug(req.params.slug as string);
    if (!deletedBlog) return res.status(404).json({ success: false, message: 'Blog not found' });
    
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Dedicated endpoint for Rich Text Editor inline image uploads
export const uploadInlineImage = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }
    
    const imageUrl = await blogService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/inline_images');
    res.status(200).json({ success: true, url: imageUrl });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
