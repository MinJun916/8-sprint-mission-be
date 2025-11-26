import { createUser, findUserByEmail } from '../repositories/auth.repository';
import AppError from '../utils/AppError';
import argon2 from 'argon2';
import { generateTokens } from '../utils/token';
import { filterSensitiveData } from '../utils/filter';

export const signupService = async (email: string, nickname: string, password: string) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError('이미 존재하는 이메일입니다.', 409);
  }

  const hashedPassword = await argon2.hash(password);

  const user = await createUser(email, nickname, hashedPassword);

  const { accessToken, refreshToken } = await generateTokens({ userId: user.id });

  return {
    user: filterSensitiveData(user),
    accessToken,
    refreshToken,
  };
};
