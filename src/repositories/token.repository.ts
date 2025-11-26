import prisma from '../config/prisma';

export const saveRefreshToken = async (userId: string, refreshToken: string) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken,
    },
    select: {
      id: true,
      refreshToken: true,
    },
  });
};
