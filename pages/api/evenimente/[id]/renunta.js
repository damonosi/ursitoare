import Evenimente from "../../../../models/Evenimente";
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
  const eveniment = await Evenimente.findById(req.query.id);
  console.log(eveniment);
  const { email } = user;
  await User.findOneAndUpdate(
    {
      email,
    },
    {
      $pullAll: {
        evenimente: [eveniment],
      },
    },
  );
  await db.disconnect();
  res.send("Nu mai Merg!");
};

export default handler;
