import { Rezervari } from "../../../../models/Rezervari";
import db from "../../../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  const rezervareConfirmata = await Rezervari.find({
    confirmat: true,
  }).exec();

  await db.disconnect();
  res.send(rezervareConfirmata);
};

export default handler;
