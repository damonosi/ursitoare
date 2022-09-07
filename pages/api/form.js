import { Rezervari } from "../../models/Rezervari";
import { User } from "../../models/User";

import db from "../../utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("ruta pentru admin");
  }
  if (req.method !== "POST") {
    return;
  }

  const {
    numecopil,
    datanastere,
    mama,
    tata,
    frati,
    unchiMatusi,
    perechinasi,
    rudeStrainatate,
    dataeveniment,
    oraInceputPetrecere,
    locatieeveniment,
    nrcontact,
    user,
  } = req.body;

  await db.connect();

  const newForm = new Rezervari({
    user,
    numecopil,
    datanastere,
    mama,
    tata,
    frati,
    unchiMatusi,
    perechinasi,
    rudeStrainatate,
    dataeveniment,
    oraInceputPetrecere,
    locatieeveniment,
    nrcontact,
  });
  const formular = await newForm.save();

  const userFiltru = req.body.user;
  await User.findOneAndUpdate(
    { _id: userFiltru },
    {
      $addToSet: {
        rezervarilemele: {
          _id: formular._id,
          numecopil: formular.numecopil,
          datanastere: formular.datanastere,
          frati: formular.frati,
          mama: formular.mama,
          tata: formular.tata,
          unchiMatusi: formular.unchiMatusi,
          perechinasi: formular.perechinasi,
          rudeStrainatate: formular.rudeStrainatate,
          locatieeveniment: formular.locatieeveniment,
          dataeveniment: formular.dataeveniment,
          oraInceputPetrecere: formular.oraInceputPetrecere,
          nrcontact: formular.nrcontact,
        },
      },
    },
  );
  await db.disconnect();

  res.status(201).send({
    message: "Cerere rezervare facuta",
    numecopil: formular.numecopil,
    datanastere: formular.datanastere,
    mama: formular.mama,
    tata: formular.tata,
    frati: formular.frati,
    perechinasi: formular.perechinasi,
    rudeStrainatate: formular.rudeStrainatate,
    dataeveniment: formular.dataeveniment,
    oraInceputPetrecere: formular.oraInceputPetrecere,
    locatieeveniment: formular.locatieeveniment,
    nrcontact: formular.nrcontact,
    user: formular.user,
  });
};
export default handler;
