import { Rezervari } from "../../../../models/Rezervari";
import db from "./../../../../utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session.user.isadmin) {
    return res.status(401).send("ruta pentru admin");
  }

  if (req.method !== "POST") {
    return;
  }

  const {
    numecopil,
    dataeveniment,
    oraInceputPetrecere,
    locatieeveniment,
    nrcontact,
  } = req.body;
  await db.connect();

  await db.disconnect();
  res.send(evenimenteAzi);
};

export default handler;
