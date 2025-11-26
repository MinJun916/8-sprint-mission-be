import { ArticleWhereInput } from '../generated/models';
import { ArticleOrderByWithRelationInput } from '../types/Article';
import {
  getAllArticlesRepository,
  getArticlesCountRepository,
} from '../repositories/article.repository';

export const getAllArticlesService = async (
  page: number,
  limit: number,
  searchQuery: string,
  sort: string,
) => {
  const currentPage = Math.max(1, page);

  const whereCondition: ArticleWhereInput = searchQuery
    ? {
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        ],
      }
    : {};

  const orderBy: ArticleOrderByWithRelationInput =
    sort === 'recent' ? { createdAt: 'desc' } : { likeCount: 'desc' };

  const articles = await getAllArticlesRepository(page, limit, whereCondition, orderBy);
  const totalCount = await getArticlesCountRepository(whereCondition);
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    articles,
    currentPage,
    currentLimit: limit,
    totalCount,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
