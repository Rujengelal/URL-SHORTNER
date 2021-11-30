import express, { Request, Response } from "express";
import urlModel, { IurlSchema } from "../model/urls.model";
import usersModel from "../model/users.model";

import { auth } from "../middlewares/auth";
const urlRoutes = express.Router();

interface Irequest extends Request {
  body: {
    redirectUrl: string;
    userId: string;
  };
}

urlRoutes.post("/urlShorten", [auth], async (req: Irequest, res: Response) => {
  const { redirectUrl, userId } = req.body;
  try {
    const user = await usersModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ msg: "No such user exists. Please login/register" });
  } catch (error) {
    return res.status(404).json({ msg: "Invalid data format" });
  }
  const shortenedUrl: IurlSchema = {
    redirectUrl,
    userId,
  };

  const urlEntry = await urlModel.create<IurlSchema>(shortenedUrl);
  res.json({ urlEntry });
});
urlRoutes.post("/allRoutes", [auth], async (req: Irequest, res: Response) => {
  const { userId } = req.body;
  try {
    const user = await urlModel.find({ userId: userId });
    res.json(user);
  } catch (error) {
    return res.status(404).json({ msg: "Invalid data format" });
  }
});

export default urlRoutes;
