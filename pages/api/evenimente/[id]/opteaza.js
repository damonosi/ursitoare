import { Rezervari } from "../../../../models/Rezervari";
import User from "../../../../models/User";
import db from "../../../../utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req, res });
  if (!session) {
    return res.status(401).send("Error: signin required");
  }
  const { user } = session;

  await db.connect();
  const rezervare = await Rezervari.findById(req.query.id);
  const { email } = user;

  await User.findOneAndUpdate(
    {
      email,
    },
    {
      $addToSet: {
        rezervari: rezervare,
      },
    },
  );
  await db.disconnect();
  res.send("Merg Aici !");
};

export default handler;
