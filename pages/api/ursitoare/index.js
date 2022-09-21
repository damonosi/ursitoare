import db from "../../../utils/db";
import { User } from "../../../models/User";

const handler = async (req, res) => {
  await db.connect();
  const Ursaitoare = await User.find({ isursitoare: true });

  let UrsMinim = new Array();
  Ursaitoare.map((ursitoare) => {
    UrsMinim.push({ name: ursitoare.name, _id: ursitoare._id });
  });
  console.log(UrsMinim);
  await db.disconnect();
  res.send(UrsMinim);
};

export default handler;
