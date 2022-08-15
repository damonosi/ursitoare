import { getSession } from "next-auth/react";
import { User } from "../../../models/User";

const handler = async (req, res) => {
  const session = await getSession({ req, res });
  if (!session) {
    return res.status(401).send("Error: signin required");
  }
  const { user } = session;
  const userId = user._id;
  const userUp = await User.findById(userId);
  const rezFacute = userUp.rezervarilemele;
  res.send(rezFacute);
};

export default handler;
