import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import asyncHandler from 'express-async-handler';
import s3Client from '../config/s3Client';
import { Request, Response } from 'express';
import HTTP_STATUS from '../constants/http.constant';

export const generatePresignedUrlService = asyncHandler(async (req: Request, res: Response) => {
  const { fileName, fileType } = req.body;

  const fileKey = `${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
    ContentType: fileType,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 3,
  });

  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Presigned URL 생성 완료',
    data: {
      presignedUrl,
      fileKey,
      fileUrl,
    },
  });
});
