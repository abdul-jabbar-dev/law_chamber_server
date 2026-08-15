import { Router } from 'express';
import * as blogController from '../controllers/blog.controller';
import upload from '../utils/multer';

const router = Router();

// CRUD Routes
router.post('/', upload.single('image'), blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:slug', blogController.getBlogBySlug);
router.put('/:slug', upload.single('image'), blogController.updateBlog);
router.delete('/:slug', blogController.deleteBlog);

// Dedicated route for Rich Text inline image uploads
router.post('/upload-image', upload.single('image'), blogController.uploadInlineImage);

export default router;
