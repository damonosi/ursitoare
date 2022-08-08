import db from "../../../utils/db";
import { User } from "../../../models/User";

const handler = async (req, res) => {
  await db.connect();
  const Ursaitoare = await User.find({ isursitoare: true });

  await db.disconnect();
  res.send(Ursaitoare);
};

export default handler;
