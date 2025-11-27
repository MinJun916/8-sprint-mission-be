import prisma from '../config/prisma';
import AppError from '../utils/AppError';
import HTTP_STATUS from '../constants/http.constant';

interface CommentHelperProps {
  content: string;
  productId?: string;
  articleId?: string;
  ownerId: string;
}

export const createCommentHelper = async ({
  content,
  productId = '',
  articleId = '',
  ownerId,
}: CommentHelperProps) => {
  if (!productId && !articleId) {
    throw new AppError('상품 또는 게시글 ID가 필요합니다.', HTTP_STATUS.BAD_REQUEST);
  }

  if (!!productId) {
    return prisma.productComment.create({
      data: {
        content,
        productId,
        ownerId,
      },
      select: {
        id: true,
        productId: true,
        content: true,
        createdAt: true,
        owner: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  }

  if (!!articleId) {
    return prisma.articleComment.create({
      data: {
        content,
        articleId,
        ownerId,
      },
      select: {
        id: true,
        articleId: true,
        content: true,
        createdAt: true,
        owner: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  }
};

export const updateCommentHelper = async ({
  type = 'product',
  content,
  commentId,
}: {
  type: 'product' | 'article';
  content: string;
  commentId: string;
}) => {
  if (!type || (type !== 'product' && type !== 'article')) {
    throw new AppError('올바르지 않은 댓글 타입입니다.', HTTP_STATUS.BAD_REQUEST);
  }

  if (type === 'product') {
    return prisma.productComment.update({
      where: { id: commentId },
      data: { content },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        owner: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  }

  if (type === 'article') {
    return prisma.articleComment.update({
      where: { id: commentId },
      data: { content },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        owner: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  }

  return;
};
