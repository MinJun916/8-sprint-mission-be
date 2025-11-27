import { z } from 'zod';

export const getCommentCursorQuerySchema = z.object({
  cursor: z.string().uuid('올바르지 않은 커서 형식입니다.').optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((value) => value >= 1, {
      message: 'limit은 1 이상이어야 합니다.',
      path: ['limit'],
    }),
});

export type GetCommentCursorQuerySchema = z.infer<typeof getCommentCursorQuerySchema>;
