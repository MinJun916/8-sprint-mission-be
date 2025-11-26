import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import HTTP_STATUS from '../constants/http.constant';

/**
 * Zod 스키마를 사용하여 요청 본문을 검증하는 미들웨어
 * @param schema - 검증할 Zod 스키마
 * @returns Express 미들웨어 함수
 */
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // req.body를 스키마로 검증
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Zod 검증 에러 처리
        const errors = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: '입력 데이터가 올바르지 않습니다.',
          errors,
        });
      }

      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '서버 오류가 발생했습니다.',
      });
    }
  };
};
