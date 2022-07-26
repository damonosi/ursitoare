import bcryptjs from "bcryptjs";
import { Evenimente } from "../../models/evenimente";
import db from "../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const {
    numecopil,
    datanastere,
    mama,
    numetata,
    frati: { nume, varsta },
    numeNasi,
    dataeveniment,
    oraeveniment,
  } = req.body;

  await db.connect();
  console.log("db connected");
  const newForm = new Evenimente({
    numecopil,
    datanastere,
    mama,
    numetata,
    frati: { nume, varsta },
    numeNasi,
    dataeveniment,
    oraeveniment,
  });
  const formular = await newForm.save();
  await db.disconnect();

  res.status(201).send({
    message: "Cerere rezervare facuta",
    numecopil: formular.numecopil,
    datanastere: formular.datanastere,
    mama: formular.mama,
    numetata: formular.numetata,
    numeFrate: formular.frati.nume,
    varstaFrate: formular.frati.varsta,
    numeNasi: formular.numeNasi,
    dataeveniment: formular.dataeveniment,
    oraeveniment: formular.oraeveniment,
  });
};
export default handler;
