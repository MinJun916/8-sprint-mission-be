import { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: '이미 존재하는 데이터입니다.',
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: '존재하지 않는 데이터입니다.',
    });
  }

  return res.status(500).json({
    success: false,
    message: '서버 오류가 발생했습니다.',
  });
};
