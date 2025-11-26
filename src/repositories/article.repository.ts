import prisma from '../config/prisma';
import { ArticleOrderByWithRelationInput, ArticleWhereInput } from '../generated/models';

export const getAllArticlesRepository = async (
  page: number,
  limit: number,
  whereCondition: ArticleWhereInput,
  orderBy: ArticleOrderByWithRelationInput,
) => {
  return prisma.article.findMany({
    where: whereCondition,
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
      likeCount: true,
      createdAt: true,
    },
  });
};

export const getArticlesCountRepository = async (whereCondition: ArticleWhereInput) => {
  return prisma.article.count({
    where: whereCondition,
  });
};
