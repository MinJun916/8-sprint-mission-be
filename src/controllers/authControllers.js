import dayjs from 'dayjs';
import { hashPassword } from '../utils/hash.js';
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserRefreshToken,
  findUserByRefreshToken,
  clearUserRefreshToken,
} from '../repositories/userRepository.js';
import { verifyUser } from '../services/authService.js';
import { createAccessToken, createRefreshToken } from '../utils/token.js';
import { filterSensitiveUserData } from '../utils/filter.js';
import { verifyToken } from '../middlewares/auth.js';

export const signup = async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      const error = new Error('Email already exists');
      error.status = 409;
      throw error;
    }

    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      email,
      nickname,
      image: '',
      encryptedPassword: hashedPassword,
    });

    const payloadUser = filterSensitiveUserData(user);

    res.status(201).json({ success: true, data: payloadUser });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await verifyUser(email, password);

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    await updateUserRefreshToken(user.id, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });

    const payloadUser = filterSensitiveUserData(user);

    res.status(200).json({
      success: true,
      data: { user: payloadUser, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    // 쿠키가 없어도 멱등하게 동작하도록 처리
    if (!refreshToken) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/auth/refresh',
      });
      return res.status(204).json({ success: true });
    }

    // 해당 리프레시 토큰을 가진 사용자를 찾고, 저장된 토큰을 무효화
    const user = await findUserByRefreshToken(refreshToken);
    if (user) {
      await clearUserRefreshToken(user.id);
    }

    // 클라이언트 쿠키 삭제
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/auth/refresh',
    });

    return res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }

    const decoded = verifyToken(refreshToken);

    const user = await findUserById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }

    const newAccessToken = createAccessToken(user.id);

    const now = dayjs();
    const expiresAt = dayjs.unix(decoded.exp);
    const remainingSeconds = expiresAt.diff(now, 'seconds');

    if (remainingSeconds <= 3) {
      const newRefreshToken = createRefreshToken(user.id);
      await updateUserRefreshToken(user.id, newRefreshToken);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/auth/refresh',
      });
    }

    res.status(200).json({
      success: true,
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
