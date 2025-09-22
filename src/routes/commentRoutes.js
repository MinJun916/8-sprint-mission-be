import Router from 'express';
import {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  getCommentByArticle,
} from '../controllers/commentControllers.js';

const router = Router();

router.get('/', getComment);
router.get('/article/:id', getCommentByArticle);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
