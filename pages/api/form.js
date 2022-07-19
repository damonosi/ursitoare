import bcryptjs from "bcryptjs";
import Formular from "../../models/Formular";
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
    altiCopiiNumeVarsta,
    numeNasi,
    dataEveniment,
    oraEveniment,
  } = req.body;

  await db.connect();
  console.log("db connected");
  const newForm = new Formular({
    numeCopil,
    dataNastereCopil,
    numeMama,
    numeTata,
    altiCopiiNumeVarsta,
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
    altiCopiiNumeVarsta: formular.altiCopiiNumeVarsta,
    numeNasi: formular.numeNasi,
    dataEveniment: formular.dataEveniment,
    oraEveniment: formular.oraEveniment,
  });
};
export default handler;
