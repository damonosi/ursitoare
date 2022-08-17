import { User } from "../../../models/User";

const handler = async (req, res) => {
  const userId = req.headers._id;
  const userUp = await User.findById(userId);

  const rezFacute = userUp.rezervarilemele;
  res.send(rezFacute);
};

export default handler;
