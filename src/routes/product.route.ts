import Router from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { validateBody, validateParams, validateQuery } from '../middlewares/validator.middleware';
import {
  createProductSchema,
  getProductByIdSchema,
  getProductsQuerySchema,
} from '../validators/product.validator';
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
} from '../controllers/product.controller';

const router = Router();

router.get('/', verifyAccessToken, validateQuery(getProductsQuerySchema), getAllProductsController);

router.get(
  '/:id',
  verifyAccessToken,
  validateParams(getProductByIdSchema),
  getProductByIdController,
);

router.post('/', verifyAccessToken, validateBody(createProductSchema), createProductController);

export default router;
