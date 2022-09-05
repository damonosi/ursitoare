import { Rezervari } from "../../../../models/Rezervari";
import db from "./../../../../utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session.user.isadmin) {
    return res.status(401).send("ruta pentru admin");
  }
  await db.connect();
  const evenimente = await Rezervari.find({ confirmat: true });
  let evenimenteAzi = new Array();
  evenimente.map((eveniment) => {
    let dataAzi = new Date();
    let dataEveniment = new Date(eveniment.dataeveniment);

    if (dataAzi.getDate() === dataEveniment.getDate()) {
      evenimenteAzi.push(eveniment);
    } else {
      return;
    }
  });

  await db.disconnect();
  res.send(evenimenteAzi);
};

export default handler;
