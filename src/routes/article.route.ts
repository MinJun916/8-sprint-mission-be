import Router from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { validateQuery } from '../middlewares/validator.middleware';
import { getArticlesQuerySchema } from '../validators/article.validator';
import { getArticlesController } from '../controllers/article.controller';

const router = Router();

router.get('/', verifyAccessToken, validateQuery(getArticlesQuerySchema), getArticlesController);

export default router;
