import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { jwtSign, jwtVerify } from "../utils/jwt";

export function auth(req: Request, res: Response, next: NextFunction) {
  console.log(req.cookies);
  const accessCookie = req.cookies.accessToken;
  const refreshCookie = req.cookies.refreshToken;

  if (!!accessCookie) {
    try {
      const payload = jwtVerify(accessCookie);
      console.log(payload);
      if (!payload) throw Error("error in access token");
      return next();
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  }
  if (!!refreshCookie) {
    try {
      let payload = jwtVerify(refreshCookie, false);
      console.log(payload);

      if (!payload) throw Error("error in refresh token");
      const accessToken = jwtSign(payload);
      res.cookie("accessToken", accessToken);
      return next();
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  }
  res.status(400).json({ msg: "Not authenticated" });
}
