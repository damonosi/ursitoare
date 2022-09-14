import { Rezervari } from "../../../../models/Rezervari";
import db from "../../../../utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req, res });
  if (!session) {
    return res.status(401).send("Error: signin required");
  }
  await db.connect();
  const rezervariConfirmate = await Rezervari.find({
    confirmat: true,
  }).exec();

  await db.disconnect();
  let rezervariConfirmateDeAzi = new Array();
  rezervariConfirmate.map((rez) => {
    let dataAzi = new Date();
    let dataEveniment = new Date(rez.dataeveniment);
    if (dataEveniment.getDate() >= dataAzi.getDate()) {
      rezervariConfirmateDeAzi.push(rez);
    } else {
      return;
    }
  });
  console.log(rezervariConfirmateDeAzi);
  res.send(rezervariConfirmateDeAzi);
};

export default handler;
