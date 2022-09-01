import { Rezervari } from "../../../../models/Rezervari";
import db from "../../../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  const rezervareId = req.body.evenimentId;
  const rezervareDeConfirmat = await Rezervari.findById(rezervareId);

  const oraAjungem = req.body.oraValue;
  await Rezervari.findOneAndUpdate(
    {
      _id: rezervareId,
    },
    {
      $set: {
        confirmat: true,
        oraConfirmata: oraAjungem,
      },
    },
  );

  await db.disconnect();
  res.send(rezervareDeConfirmat);
};

export default handler;
