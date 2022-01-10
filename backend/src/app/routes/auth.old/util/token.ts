import jwt from "jsonwebtoken";

const secondsIn30Days = 30 * 86400;

export const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_KEY as string, {
    expiresIn: secondsIn30Days,
  }); // secret is defined in the environment variable JWT_SECRET
};
