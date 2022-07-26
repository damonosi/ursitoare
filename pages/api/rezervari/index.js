import Evenimente from "../../../models/Evenimente";
import db from "../../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  const rezervare = await Evenimente.find();

  await db.disconnect();
  res.send(rezervare);
};

export default handler;
