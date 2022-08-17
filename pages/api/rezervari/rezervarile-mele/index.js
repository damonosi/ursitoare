import { User } from "../../../models/User";
import db from "../../../utils/db";
const handler = async (req, res) => {
  const userId = await req.headers._id;
  await db.connect();
  const userUp = await User.findById(userId);
  await db.disconnect();
  let rezFacute = userUp.rezervarilemele;

  res.send(rezFacute);
};

export default handler;
