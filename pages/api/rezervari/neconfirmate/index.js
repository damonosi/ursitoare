import { Rezervari } from "../../../../models/Rezervari";
import db from "../../../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  const neconfirmate = await Rezervari.find({
    confirmat: false,
  }).exec();

  await db.disconnect();
  res.send(neconfirmate);
};

export default handler;
