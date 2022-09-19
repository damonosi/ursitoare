import { Rezervari } from "../../../../models/Rezervari";
import { User } from "../../../../models/User";
import db from "../../../../utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req, res });
  if (!session) {
    return res.status(401).send("Error: signin required");
  }
  const { user } = session;
  await db.connect();
  const rezervareId = req.body.evId;
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
  await User.findOneAndUpdate(
    {
      _id: user._id,
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
