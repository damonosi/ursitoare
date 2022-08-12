import mongoose from "mongoose";
import { userSchema } from "./Rezervari";
export const evenimenteSchema = new mongoose.Schema(
  {
    numecopil: { type: String, required: true },
    datanastere: { type: String, required: true },
    frati: [
      {
        nume: { type: String, required: false },
        varsta: { type: String, required: true },
      },
    ],
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
