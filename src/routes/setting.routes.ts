import express from 'express';
import * as settingController from '../controllers/setting.controller';
import { protect } from '../utils/jwt';

const router = express.Router();

router.get('/', settingController.getSettings);
router.put('/', protect, settingController.updateSettings);

export default router;
