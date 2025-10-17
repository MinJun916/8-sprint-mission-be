import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const accessTokenOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyAccessToken = async (payload, done) => {
  try {
    const user = await findUserById(payload.userId);

    if (!user) {
      return done(null, false);
    }

    const { encryptedPassword, refreshToken, ...safeUserData } = user;

    return done(null, safeUserData);
  } catch (error) {
    return done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(accessTokenOptions, verifyAccessToken);
