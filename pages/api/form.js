import { Rezervari } from "../../models/Rezervari";
import { User } from "../../models/User";

import db from "../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const {
    numecopil,
    datanastere,
    mama,
    tata,
    frate1,
    frate2,
    frate3,
    perechinasi,
    dataeveniment,
    oraeveniment,
    localitateeveniment,
    locatieeveniment,
    nrcontact,
    user,
  } = req.body;

  await db.connect();
  console.log("db connected");
  const newForm = new Rezervari({
    user,
    numecopil,
    datanastere,
    mama,
    tata,
    frate1,
    frate2,
    frate3,
    perechinasi,
    dataeveniment,
    oraeveniment,
    localitateeveniment,
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
          frate1: formular.frate1,
          frate2: formular.frate2,
          frate2: formular.frate3,
          mama: formular.mama,
          tata: formular.tata,
          perechinasi: formular.perechinasi,
          locatieeveniment: formular.locatieeveniment,
          localitateeveniment: formular.localitateeveniment,
          dataeveniment: formular.dataeveniment,
          oraeveniment: formular.oraeveniment,
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
    numeFrate1: formular.frate1.nume,
    varstaFrate1: formular.frate1.varsta,
    numeFrate2: formular.frate2.nume,
    varstaFrate2: formular.frate2.varsta,
    numeFrate3: formular.frate3.nume,
    varstaFrate3: formular.frate3.varsta,
    perechinasi: formular.perechinasi,
    dataeveniment: formular.dataeveniment,
    oraeveniment: formular.oraeveniment,
    locatieeveniment: formular.locatieeveniment,
    localitateeveniment: formular.localitateeveniment,
    nrcontact: formular.nrcontact,
    user: formular.user,
  });
};
export default handler;
