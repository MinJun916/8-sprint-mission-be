import prisma from '../config/prisma';

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
