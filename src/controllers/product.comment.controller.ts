import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getCommentCursorQuerySchema } from '../validators/comment.validator';
import { getProductCommentService } from '../services/product.comment.service';
import HTTP_STATUS from '../constants/http.constant';

export const getProductCommentController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cursor = '', limit = 10 } = getCommentCursorQuerySchema.parse(req.query);

  const { comments, nextCursor, hasNextPage } = await getProductCommentService({
    cursor,
    limit,
    productId: id,
  });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '상품 댓글 조회 성공',
    data: {
      comments,
    },
    pagination: {
      nextCursor,
      hasNextPage,
    },
  });
});
