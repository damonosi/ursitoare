import { getSession } from "next-auth/react";
import { User } from "../../../models/User";
import db from "./../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req, res });
  if (!session) {
    return res.status(401).send("Error: signin required");
  }

  const { user } = session;
  db.connect();
  const userConnectat = await User.findById(user._id);

  let evenimenteleMele = userConnectat.rezervari;
  res.send(evenimenteleMele);
};

export default handler;
