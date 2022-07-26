import { Rezervari } from "../../../models/Rezervari";
import db from "../../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  const rezervare = await Rezervari.find();

  await db.disconnect();
  res.send(rezervare);
};

export default handler;
