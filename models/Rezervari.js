import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  },
);
export const Rezervari =
  mongoose.models.Rezervari || mongoose.model("Rezervari", evenimenteSchema);
