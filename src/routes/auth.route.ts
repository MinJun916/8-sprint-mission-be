import Router from 'express';
import { signupController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validator.middleware';
import { signupSchema } from '../validators/auth.validator';

const router = Router();

router.get('/me');
router.post('/signup', validate(signupSchema), signupController);

export default router;
