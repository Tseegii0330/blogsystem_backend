import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { isNil } from "../utils/validations.js";
const config = process.env;

export function generateToken(payload) {
  const secretKey = process.env.TOKEN_KEY;
  const now = Math.floor(Date.now() / 1000);
  const expireTime = payload.expireTime ?? 24;
  const expireDate = Math.floor(Date.now() / 1000) + expireTime * 60 * 60;
  const token = {
    id: payload.id,
    sub: payload.sub,
    iss: payload.iss,
    aud: payload.aud,
    iat: now,
    exp: expireDate,
    data: payload.data,
  };
  return jwt.sign(token, secretKey);
}

export async function comparePassword(password, userPass) {
  return await bcrypt.compare(password, userPass);
}

export async function hashPassword(password) {
  return await bcrypt.hash(password.toString(), 8);
}

export const verifyApiToken = (req, res, next) => {
  const token =
    req.headers.authorization ||
    req.query.token ||
    req.headers["x-access-token"];

  if (isNil(token)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    req.authorizer = decoded.data;
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  return next();
};
