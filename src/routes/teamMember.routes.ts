import { Router } from 'express';
import upload from '../utils/multer';
import * as teamMemberController from '../controllers/teamMember.controller';

const router = Router();

router.post('/', upload.single('image'), teamMemberController.createTeamMember);
router.get('/', teamMemberController.getAllTeamMembers);
router.get('/:id', teamMemberController.getTeamMember);
router.put('/reorder', teamMemberController.reorderTeamMembers);
router.put('/:id', upload.single('image'), teamMemberController.updateTeamMember);
router.delete('/:id', teamMemberController.deleteTeamMember);

export default router;
