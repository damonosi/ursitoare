import { getSession } from "next-auth/react";
import { User } from "../../../models/User";
import db from "./../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req, res });
  if (!session) {
    return res.status(401).send("Error: signin required");
  }

  const { user } = session;
  await db.connect();
  const userConnectat = await User.findById(user._id);
  await db.disconnect();
  let evenimenteleMele = userConnectat.rezervari;
  let evenimenteValabile = new Array();
  let dataAzi = new Date();
  evenimenteleMele.map((eveniment) => {
    let dataEveniment = new Date(eveniment.dataeveniment);
    if (
      dataEveniment.getDate() >= dataAzi.getDate() &&
      eveniment.confirmat === true
    ) {
      evenimenteValabile.push(eveniment);
    }
  });

  res.send(evenimenteValabile);
};

export default handler;
