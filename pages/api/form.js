import bcryptjs from "bcryptjs";
import { Rezervari } from "../../models/Rezervari";
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
    frati: { nume, varsta },
    nasi,
    dataeveniment,
    oraeveniment,
    nrcontact,
  } = req.body;

  await db.connect();
  console.log("db connected");
  const newForm = new Rezervari({
    numecopil,
    datanastere,
    mama,
    tata,
    frati: { nume, varsta },
    nasi,
    dataeveniment,
    oraeveniment,
    nrcontact,
  });
  const formular = await newForm.save();
  await db.disconnect();

  res.status(201).send({
    message: "Cerere rezervare facuta",
    numecopil: formular.numecopil,
    datanastere: formular.datanastere,
    mama: formular.mama,
    tata: formular.tata,
    numeFrate: formular.frati.nume,
    varstaFrate: formular.frati.varsta,
    nasi: formular.nasi,
    dataeveniment: formular.dataeveniment,
    oraeveniment: formular.oraeveniment,
    nrcontact: formular.nrcontact,
  });
};
export default handler;
