import mongoose from "mongoose";
import { Rezervari } from "../../../models/Rezervari";
import { User } from "../../../models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const filtru = req.body.rezId;
  const filtruUrsitoare = req.body.ursitoareId;
  await db.connect();
  const ursitori = await User.findById(req.body.ursitoareId);
  const eveniment = await Rezervari.findById(req.body.rezId);
  const dateFrati = eveniment.frati[0];

  await Rezervari.findOneAndUpdate(
    {
      _id: filtru,
    },
    {
      $addToSet: {
        ursitoare: ursitori,
      },
    },
  );
  await User.findOneAndUpdate(
    {
      _id: filtruUrsitoare,
    },

    {
      $addToSet: {
        rezervari: {
          _id: eveniment._id,
          numecopil: eveniment.numecopil,
          datanastere: eveniment.datanastere,
          frati: { nume: dateFrati.nume, varsta: dateFrati.varsta },
          mama: eveniment.mama,
          tata: eveniment.tata,
          nasi: eveniment.nasi,
          dataeveniment: eveniment.dataeveniment,
          oraeveniment: eveniment.oraeveniment,
          nrcontact: eveniment.nrcontact,
        },
      },
    },
    { new: false },
  );

  await db.disconnect();
  res.send("Bravo");
};

export default handler;
