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
          frate1: eveniment.frate1,
          frate2: eveniment.frate2,
          frate2: eveniment.frate3,
          mama: eveniment.mama,
          tata: eveniment.tata,
          nasi: eveniment.nasi,
          locatieeveniment: eveniment.locatieeveniment,
          localitateeveniment: eveniment.localitateeveniment,
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
