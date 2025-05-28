export function generateToken(payload) {
  const secretKey = process.env.TOKEN_KEY;
  const now = Math.floor(Date.now() / 1000);
  const expireDate = Math.floor(Date.now() / 1000) + 72 * 60 * 60;
  const data = encrypt128ctr(JSON.stringify(payload.data));
  const token = {
    id: payload.id,
    sub: payload.sub,
    iss: payload.iss,
    aud: payload.aud,
    iat: now,
    exp: expireDate,
    data,
  };

  return jwt.sign(token, secretKey);
}
