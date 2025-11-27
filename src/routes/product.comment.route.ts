import Router from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { validateParams } from '../middlewares/validator.middleware';
import { idSchema } from '../validators/id.validator';
import { getProductCommentController } from '../controllers/product.comment.controller';

const router = Router();

router.get('/:id', verifyAccessToken, validateParams(idSchema), getProductCommentController);

export default router;
