import { getProductCommentRepository } from '../repositories/product.comment.repository';

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
