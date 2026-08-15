import express from 'express';
import * as profileController from '../controllers/profile.controller';
import upload from '../utils/multer';

const router = express.Router();

router.get('/', profileController.getProfile);
router.put('/', upload.single('image'), profileController.updateProfile);

export default router;
