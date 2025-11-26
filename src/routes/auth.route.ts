import Router from 'express';
import { signinController, signupController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validator.middleware';
import { signinSchema, signupSchema } from '../validators/auth.validator';

const router = Router();

router.get('/me');
router.post('/signup', validate(signupSchema), signupController);
router.post('/signin', validate(signinSchema), signinController);

export default router;
