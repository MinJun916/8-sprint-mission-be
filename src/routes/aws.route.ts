import { Router } from 'express';
import { generatePresignedUrlService } from '../services/aws.service';

const router = Router();

router.post('/presigned-url', generatePresignedUrlService);

export default router;
