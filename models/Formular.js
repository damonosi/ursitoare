import mongoose from "mongoose";

const formularSchema = new mongoose.Schema(
  {
    numeCopil: { type: String, required: true },
    dataNastereCopil: { type: String, required: true },
    numeMama: { type: String, required: true },
    numeTata: { type: String, required: true },
    altiCopiiNumeVarsta: { type: String, required: false },
    numeNasi: { type: String, required: true },
    dataEveniment: { type: String, required: true },
    oraEveniment: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const Formular =
  mongoose.models.Formular || mongoose.model("Formular", formularSchema);
export default Formular;
