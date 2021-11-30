import mongoose from "mongoose";
import { nanoid } from "nanoid";

export interface IurlSchema {
  redirectUrl: string;
  userId: string;
  shortUrl?: string;
}

const urlSchema = new mongoose.Schema<IurlSchema>({
  shortUrl: { type: String, default: () => nanoid(8), unique: true },
  redirectUrl: String,
  userId: String,
});

export default mongoose.model<IurlSchema>("Urls", urlSchema);
