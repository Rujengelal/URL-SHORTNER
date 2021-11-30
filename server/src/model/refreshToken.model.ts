import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema<{
  token: string;
}>({
  token: String,
});
refreshTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 65 });
export default mongoose.model<{ token: string }>(
  "refreshTokens",
  refreshTokenSchema
);
