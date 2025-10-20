import Router from 'express';
import { signup, signin, signout, refreshToken, me } from '../controllers/authControllers.js';
import { signupValidator, signinValidator } from '../middlewares/validate/authValidator.js';
import { handleValidation } from '../middlewares/validate/index.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.get('/me', authenticate, me);
router.post('/signup', signupValidator, handleValidation, signup);
router.post('/signin', signinValidator, handleValidation, signin);
router.post('/signout', signout);
router.post('/refresh', refreshToken);

export default router;
