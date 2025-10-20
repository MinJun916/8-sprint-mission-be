import jwt from 'jsonwebtoken';
import { findUserById } from '../repositories/userRepository.js';
import { filterSensitiveUserData } from '../utils/filter.js';

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const authenticate = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization || '';
    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }

    const user = await findUserById(decoded.userId);
    if (!user) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }

    req.user = filterSensitiveUserData(user);
    next();
  } catch (error) {
    next(error);
  }
};
