import { User } from "../../../models/User";

const handler = async (req, res) => {
  const userId = await req.headers._id;
  const userUp = await User.findById(userId);

  let rezFacute = userUp.rezervarilemele;

  res.send(rezFacute);
};

export default handler;
