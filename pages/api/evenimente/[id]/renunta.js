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
  console.log(eveniment);
  const { email } = user;
  await User.findOneAndUpdate(
    {
      email,
    },
    {
      $pullAll: {
        rezervari: [rezervare],
      },
    },
  );
  await db.disconnect();
  res.send("Nu mai Merg!");
};

export default handler;
