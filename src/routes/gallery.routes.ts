import { Router } from 'express';
import * as galleryController from '../controllers/gallery.controller';
import upload from '../utils/multer';

const router = Router();

router.post('/', upload.single('image'), galleryController.createGalleryItem);
router.get('/', galleryController.getAllGalleryItems);
router.delete('/:id', galleryController.deleteGalleryItem);

export default router;
