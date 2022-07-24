import mongoose from "mongoose";
import { evenimenteSchema } from "./Evenimente";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isUrsitoare: { type: Boolean, default: false },
    numarEvenimente: { type: Number, default: "0" },
    evenimente: [{ type: [evenimenteSchema], default: undefined }],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
