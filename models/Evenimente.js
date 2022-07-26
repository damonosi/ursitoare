import mongoose from "mongoose";

const evenimenteSchema = new mongoose.Schema(
  {
    numeCopil: { type: String, required: true },
    dataNastereCopil: { type: String, required: true },
    frati: [
      {
        nume: { type: String, required: false },
        varsta: { type: String, required: true },
      },
    ],
    numeMama: { type: String, required: true },
    numeTata: { type: String, required: true },

    numeNasi: { type: String, required: true },
    dataEveniment: { type: String, required: true },
    oraEveniment: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);
export const Evenimente =
  mongoose.models.Evenimente || mongoose.model("Evenimente", evenimenteSchema);
