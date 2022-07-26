import mongoose from "mongoose";
import { evenimenteSchema } from "./Evenimente";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isadmin: { type: Boolean, required: true, default: false },
    isursitoare: { type: Boolean, default: false },
    numarevenimente: { type: Number, default: "0" },
    evenimente: { type: [evenimenteSchema] },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
