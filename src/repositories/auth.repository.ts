import prisma from '../config/prisma';

export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (email: string, nickname: string, hashedPassword: string) => {
  return await prisma.user.create({
    data: {
      email,
      nickname,
      encryptedPassword: hashedPassword,
    },
  });
};
