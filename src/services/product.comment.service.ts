import {
  createProductCommentRepository,
  getProductCommentRepository,
  updateProductCommentRepository,
} from '../repositories/product.comment.repository';

export const getProductCommentService = async ({
  cursor,
  limit,
  productId,
}: {
  cursor: string;
  limit: number;
  productId: string;
}) => {
  const take = limit + 1;

  const comments = await getProductCommentRepository({ take, cursor, productId });

  let nextCursor: string | null = null;

  if (comments.length > limit) {
    const lastComment = comments[limit - 1];
    nextCursor = lastComment.id;
    comments.pop();
  }

  return {
    comments,
    nextCursor,
    hasNextPage: nextCursor !== null,
  };
};

export const createProductCommentService = async ({
  content,
  productId,
  ownerId,
}: {
  content: string;
  productId: string;
  ownerId: string;
}) => {
  return await createProductCommentRepository({ content, productId, ownerId });
};

export const updateProductCommentService = async ({
  content,
  commentId,
}: {
  content: string;
  commentId: string;
}) => {
  return await updateProductCommentRepository({ content, commentId });
};
