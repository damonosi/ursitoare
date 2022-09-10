import { Rezervari } from "../../../../models/Rezervari";
import db from "../../../../utils/db";

const handler = async (req, res) => {
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
