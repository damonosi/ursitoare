import mongoose from "mongoose";
import { userSchema } from "./Rezervari";
export const evenimenteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    numecopil: { type: String, required: true },
    datanastere: { type: String, required: true },
    frati: [
      {
        nume: { type: String, required: false },
        varsta: { type: String, required: false },
      },
    ],

    mama: { type: String, required: true },
    tata: { type: String, required: true },

    perechinasi: [
      {
        nas: { type: String, required: false },
        nasa: { type: String, required: false },
        aucopii: { type: String, required: false },
        copii: [
          {
            nume: { type: String, required: true },
            varsta: { type: String, required: true },
          },
        ],
      },
    ],
    dataeveniment: { type: String, required: true },
    oraeveniment: { type: String, required: true },
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
