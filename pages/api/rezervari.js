import Formular from "../../models/Formular";
import db from "../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  const rezervare = await Formular.find();
  await db.disconnect();
  res.send(rezervare);
};

export default handler;
