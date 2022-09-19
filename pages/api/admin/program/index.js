import { Rezervari } from "../../../../models/Rezervari";
import db from "../../../../utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session.user.isadmin) {
    return res.status(401).send("ruta pentru admin");
  }
  await db.connect();
  const evenimente = await Rezervari.find({ confirmat: true });
  let evenimenteDeAzi = new Array();
  evenimente.map((eveniment) => {
    let dataAzi = new Date();
    let dataEveniment = new Date(eveniment.dataeveniment);

    if (dataEveniment.getDate() >= dataAzi.getDate()) {
      evenimenteDeAzi.push(eveniment);
    } else {
      return;
    }
  });
  const valSort = evenimenteDeAzi.sort((a, b) => {
    return a.oraInceputPetrecere - b.oraInceputPetrecere;
  });
  await db.disconnect();
  res.send(valSort);
};

export default handler;
