import express, { Request, Response } from "express";
import userModel, { Iuser } from "../model/users.model";
import jwt from "jsonwebtoken";
import refreshTokenModel from "../model/refreshToken.model";
const userRoute = express.Router();

interface IloginUser {
  email: string;
  password: string;
}

interface IloginRequest extends Request {
  body: IloginUser;
}

interface IaddUser extends Iuser {
  confirmPassword: string;
}

export interface IuserRequest extends Request {
  body: IaddUser;
}

userRoute.post("/register", async (req: IuserRequest, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return res.status(400).json({ msg: "passwords dont match" });

    const userDetails: Iuser = {
      name,
      email: email.toLowerCase(),
      password,
    };
    const user = await userModel.create(userDetails);
    res.json({ msg: "user added", user });
  } catch (e: any) {
    if (e.code == 11000)
      res.status(400).json({ msg: "Account already exists" });
  }
});
userRoute.post("/login", async (req: IloginRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email.toLowerCase(),
    password,
  });
  console.log(user);
  if (!user) return res.status(400).json({ msg: "no account with that login" });
  // console.log(req.cookies);
  const accessToken = jwt.sign({ id: user._id }, "accesstokensecret");
  const refreshToken = jwt.sign({ id: user._id }, "refreshtokensecret");
  try {
    await refreshTokenModel.create({ token: refreshToken });
  } catch (error) {
    return res.status(400).json({ msg: "error in storing refresh token" });
  }

  res.cookie("accessToken", accessToken, {
    secure: false,
    maxAge: 1000 * 60 * 60,
  });
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    maxAge: 1000 * 60 * 60,
  });

  return res.json({
    id: user._id,
    email: user.email,
  });
});
export default userRoute;
