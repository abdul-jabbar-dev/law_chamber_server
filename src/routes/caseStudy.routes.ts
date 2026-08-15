import { Router } from 'express';
import upload from '../utils/multer';
import * as caseStudyController from '../controllers/caseStudy.controller';

const router = Router();

router.post('/', upload.single('image'), caseStudyController.createCaseStudy);
router.get('/', caseStudyController.getAllCaseStudies);
router.get('/:slug', caseStudyController.getCaseStudyBySlug);
router.put('/reorder', caseStudyController.reorderCaseStudies);
router.put('/:id', upload.single('image'), caseStudyController.updateCaseStudy);
router.delete('/:id', caseStudyController.deleteCaseStudy);

export default router;
