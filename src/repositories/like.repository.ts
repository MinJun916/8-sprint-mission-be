import prisma from '../config/prisma';

export const getMyLikeProductRepository = async (userId: string, productId: string) => {
  return prisma.productLike.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};
