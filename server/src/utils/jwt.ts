import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import refreshTokenModel from "../model/refreshToken.model";

export async function jwtSign(payload: any, access = true) {
  if (access)
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string);
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string);
  await refreshTokenModel.create({ token: token });
  return token;
}

export function jwtVerify(token: any, access = true) {
  try {
    return access
      ? jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
      : jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
  } catch (error) {
    return null;
  }
}
