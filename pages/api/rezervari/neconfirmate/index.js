import { Rezervari } from "../../../../models/Rezervari";
import db from "../../../../utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req, res });
  if (!session) {
    return res.status(401).send("Error: signin required");
  }
  await db.connect();
  const neconfirmate = await Rezervari.find({
    confirmat: false,
  }).exec();
  await db.disconnect();
  let evenimenteValabile = new Array();
  let dataAzi = new Date();

  neconfirmate.map((eveniment) => {
    let dataEveniment = new Date(eveniment.dataeveniment);

    if (dataEveniment.getDate() >= dataAzi.getDate()) {
      evenimenteValabile.push(eveniment);
    }
  });

  const valSort = evenimenteValabile.sort((a, b) => {
    return a.oraInceputPetrecere - b.oraInceputPetrecere;
  });

  res.send(valSort);
};

export default handler;
