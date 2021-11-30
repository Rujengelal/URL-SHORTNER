import express, { Request, Response } from "express";
import urlRoutes from "./routes/urlRoutes";
import db from "./database/db";
import userRoute from "./routes/usersRoute";
import cors from "cors";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import urlsModel from "./model/urls.model";
dotenv.config();

// console.log(process.env.ACCESS_TOKEN_SECRET);
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieparser());

app.use("/api", urlRoutes, userRoute);

app.use("/:shortUrl", async (req: Request, res: Response) => {
  const redirectUrl = await urlsModel.findOne({
    shortUrl: req.params.shortUrl,
  });
  console.log("urls", { redirectUrl, url: req.params.shortUrl });
  if (!redirectUrl) return res.status(400).json({ msg: "No urls found" });
  res.redirect(redirectUrl.redirectUrl);
});

app.use("/", (req: Request, res: Response) => {
  res.json({ msg: "hello" });
});

app.listen(5050, () => {
  console.log("Express started at http://localhost:5050");
  db();
});
