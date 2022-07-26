import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req, res });
  if (!session) {
    return res.status(401).send("Error: signin required");
  }
  const { user } = session;
  let evenimenteleMele = user.evenimente;
  res.send(evenimenteleMele);
};

export default handler;
