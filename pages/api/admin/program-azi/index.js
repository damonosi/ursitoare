import { Rezervari } from "../../../../models/Rezervari";
import db from "./../../../../utils/db";

const handler = async (req, res) => {
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
