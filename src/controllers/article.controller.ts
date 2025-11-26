import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { getAllArticlesService } from '../services/article.service';
import HTTP_STATUS from '../constants/http.constant';
import { getArticlesQuerySchema } from '../validators/article.validator';

export const getArticlesController = asyncHandler(async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    searchQuery = '',
    sort = 'recent',
  } = getArticlesQuerySchema.parse(req.query);

  const {
    articles,
    currentPage,
    currentLimit,
    totalCount,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = await getAllArticlesService(page, limit, searchQuery, sort);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '게시글 목록 조회 성공',
    data: {
      articles,
    },
    pagination: {
      currentPage: currentPage,
      limit: currentLimit,
      totalCount,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  });
});
