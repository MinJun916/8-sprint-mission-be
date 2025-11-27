import prisma from '../config/prisma';
import {
  createCommentHelper,
  deleteCommentHelper,
  updateCommentHelper,
} from '../helpers/comment.helper';

export const getProductCommentRepository = async ({
  take,
  cursor,
  productId,
}: {
  take: number;
  cursor: string;
  productId: string;
}) => {
  return prisma.productComment.findMany({
    take,
    where: { productId },
    skip: cursor ? 1 : 0,
    ...(cursor && { cursor: { id: cursor } }),
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const createProductCommentRepository = async ({
  content,
  productId,
  ownerId,
}: {
  content: string;
  productId: string;
  ownerId: string;
}) => {
  return await createCommentHelper({ content, productId, ownerId });
};

export const updateProductCommentRepository = async ({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) => {
  return await updateCommentHelper({ content, commentId, type: 'product' });
};

export const deleteProductCommentRepository = async ({ commentId }: { commentId: string }) => {
  return await deleteCommentHelper({ type: 'product', commentId });
};
