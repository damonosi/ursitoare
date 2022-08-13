import mongoose from "mongoose";
import { userSchema } from "./Rezervari";
export const evenimenteSchema = new mongoose.Schema(
  {
    numecopil: { type: String, required: true },
    datanastere: { type: String, required: true },
    frate1: {
      required: false,
      nume: { type: String, required: true },
      varsta: { type: String, required: true },
    },
    frate2: {
      required: false,
      nume: { type: String, required: false },
      varsta: { type: String, required: false },
    },
    frate3: {
      required: false,
      nume: { type: String, required: false },
      varsta: { type: String, required: false },
    },

    mama: { type: String, required: true },
    tata: { type: String, required: true },

    nasi: { type: String, required: true },
    dataeveniment: { type: String, required: true },
    oraeveniment: { type: Number, required: true },
    locatieeveniment: { type: String, required: true },
    localitateeveniment: { type: String, required: true },
    nrcontact: { type: Number, required: true },
    ursitoare: { type: [userSchema] },
  },
  {
    timestamps: true,
  },
);
export const Rezervari =
  mongoose.models.Rezervari || mongoose.model("Rezervari", evenimenteSchema);
