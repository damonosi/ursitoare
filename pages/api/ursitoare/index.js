import db from "../../../utils/db";
import { User } from "../../../models/User";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req, res });
  if (!session) {
    return res.status(401).send("Error: signin required");
  }
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
