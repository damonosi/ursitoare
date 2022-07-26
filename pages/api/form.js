import bcryptjs from "bcryptjs";
import Evenimente from "../../models/evenimente";
import db from "../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const {
    numeCopil,
    dataNastereCopil,
    numeMama,
    numeTata,
    frati: { nume, varsta },
    numeNasi,
    dataEveniment,
    oraEveniment,
  } = req.body;

  await db.connect();
  console.log("db connected");
  console.log(Evenimente);
  const newForm = new Evenimente({
    numeCopil,
    dataNastereCopil,
    numeMama,
    numeTata,
    frati: { nume, varsta },
    numeNasi,
    dataEveniment,
    oraEveniment,
  });
  const formular = await newForm.save();
  await db.disconnect();

  res.status(201).send({
    message: "Cerere rezervare facuta",
    numeCopil: formular.numeCopil,
    dataNastereCopil: formular.dataNastereCopil,

    numeMama: formular.numeMama,
    numeTata: formular.numeTata,
    numeFrate: formular.frati.nume,
    varstaFrate: formular.frati.varsta,
    numeNasi: formular.numeNasi,
    dataEveniment: formular.dataEveniment,
    oraEveniment: formular.oraEveniment,
  });
};
export default handler;
