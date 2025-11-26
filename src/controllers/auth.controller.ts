import { Request, RequestHandler, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { SignupSchemaType } from '../validators/auth.validator';
import { signupService } from '../services/auth.service';
import HTTP_STATUS from '../constants/http.constant';

export const signupController = asyncHandler(
  async (req: Request<{}, {}, Omit<SignupSchemaType, 'passwordConfirm'>>, res: Response) => {
    const { email, nickname, password } = req.body;
    const { user, accessToken, refreshToken } = await signupService(email, nickname, password);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: '회원가입이 완료되었습니다.',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  },
);
