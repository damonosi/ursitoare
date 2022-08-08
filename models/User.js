import mongoose from "mongoose";
import { evenimenteSchema } from "./Rezervari";

export const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isadmin: { type: Boolean, required: true, default: false },
    isursitoare: { type: Boolean, default: false },
    rezervari: { type: [evenimenteSchema] },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
