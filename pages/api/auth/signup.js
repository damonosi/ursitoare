import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({ message: "Validation error" });
    return;
  }

  await db.connect();
  console.log("db connected");
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "User exists already" });
    await db.disconnect();
    return;
  }
  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
    isUrsitoare: false,
  });
  const user = await newUser.save();
  await db.disconnect();

  res.status(201).send({
    message: "Created User",
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isUrsitoare: user.isUrsitoare,
    numarEvenimente: user.numarEvenimente,
    evenimente: user.evenimente,
  });
};
export default handler;
