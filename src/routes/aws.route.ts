import { Router } from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { generatePresignedUrlService } from '../services/aws.service';

const router = Router();

router.post('/presigned-url', verifyAccessToken, generatePresignedUrlService);

export default router;
