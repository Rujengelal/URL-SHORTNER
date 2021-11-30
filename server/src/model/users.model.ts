import { model, Schema } from "mongoose";

export interface Iuser {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<Iuser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model("users", userSchema);
