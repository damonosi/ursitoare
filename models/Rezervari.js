import mongoose from "mongoose";

export const evenimenteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    confirmat: { type: Boolean, required: false, default: false },
    numecopil: { type: String, required: true },
    datanastere: { type: String, required: false },
    frati: [
      {
        nume: { type: String, required: false },
        varsta: { type: String, required: false },
      },
    ],

    mama: { type: String, required: false },
    tata: { type: String, required: false },
    unchiMatusi: [
      {
        nume: { type: String, required: false },
        casatorit: { type: String, required: false },
        areCopii: { type: String, required: false },
        numeSotieSot: { type: String, required: false },
        copii: [
          {
            nume: { type: String, required: true },
            varsta: { type: String, required: true },
          },
        ],
      },
    ],

    perechinasi: [
      {
        nas: { type: String, required: false },
        nasa: { type: String, required: false },
        aucopii: { type: String, required: false },
        casatoriti: { type: String, required: false },
        copii: [
          {
            nume: { type: String, required: true },
            varsta: { type: String, required: true },
          },
        ],
      },
    ],
    rudeStrainatate: [
      {
        nume: { type: String, required: false },
        gradRudenie: { type: String, required: false },
        tara: { type: String, required: false },
      },
    ],
    dataeveniment: { type: String, required: true },
    oraInceputPetrecere: { type: String, required: true },
    oraConfirmata: { type: String, required: false },
    locatieeveniment: {
      nume: { type: String, required: true },
      lat: { type: String, required: true },
      lng: { type: String, required: true },
    },
    nrcontact: { type: Number, required: true },
    ursitoare: [
      {
        nume: { type: String, required: false },
      },
    ],
  },
  {
    timestamps: true,
  },
);
export const Rezervari =
  mongoose.models.Rezervari || mongoose.model("Rezervari", evenimenteSchema);
