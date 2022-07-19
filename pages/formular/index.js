import { useForm } from "react-hook-form";

import styles from "./Formular.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils/error";

export default function FormularPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const submitHandler = async ({
    numeCopil,
    dataNastereCopil,
    numeMama,
    numeTata,
    altiCopiiNumeVarsta,
    numeNasi,
    dataEveniment,
    oraEveniment,
  }) => {
    try {
      await axios.post("/api/form", {
        numeCopil,
        dataNastereCopil,
        numeMama,
        numeTata,
        altiCopiiNumeVarsta,
        numeNasi,
        dataEveniment,
        oraEveniment,
      });
      toast.success("Rezervare facuta !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const toDay = new Date().toLocaleDateString().substring(0, 10);

  return (
    <div className={styles.formularContainer}>
      <form className="" onSubmit={handleSubmit(submitHandler)}>
        <h1>Rezervare ursitoare</h1>
        <div className={styles.dateCopil}>
          <h1>Date copil</h1>
          <div className={styles.randFormular}>
            <label htmlFor="numeCopil">Numele copilului : </label>
            <input
              type="text"
              {...register("numeCopil", {
                required: "Va rugam sa introduceti numele copilului",
              })}
              className=""
              id="numeCopil"
              autoFocus
            ></input>
          </div>

          <div className={styles.randFormular}>
            <label htmlFor="dataNastereCopil">
              Data nasterii (luna / ziua / anul ) :
            </label>
            <input
              type="date"
              defaultValue={toDay}
              {...register("dataNastereCopil", {
                required: "Va rugam sa data cand s-a naschut copilul",
              })}
              className=""
              id="dataNastereCopil"
              autoFocus
            />
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="numeMama">Numele mamei : </label>
            <input
              type="text"
              {...register("numeMama", {
                required: "Va rugam sa introduceti numele mamei",
              })}
              className=""
              id="numeMama"
              autoFocus
            ></input>
          </div>

          <div className={styles.randFormular}>
            <label htmlFor="numeTata">Numele tatalui : </label>
            <input
              type="text"
              {...register("numeTata", {
                required: "Va rugam sa introduceti numele tatalui",
              })}
              className=""
              id="numeTata"
              autoFocus
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="altiCopiiNumeVarsta">
              Numele si varsta celorlalti copii :
            </label>
            <input
              type="text"
              {...register("altiCopiiNumeVarsta", {
                required: "Va rugam sa bifati daca au si alti copii ; ",
              })}
              className=""
              id="altiCopiiNumeVarsta"
              autoFocus
            ></input>
          </div>

          <div className={styles.randFormular}>
            <label htmlFor="numeNasi">Numele nasilor : </label>
            <input
              type="text"
              {...register("numeNasi", {
                required: "Va rugam sa introduceti numele tatalui",
              })}
              className=""
              id="numeNasi"
              autoFocus
            ></input>
          </div>
        </div>
        <div className={styles.dateEveniment}>
          <h1>Data eveniment : </h1>
          <div className={styles.randFormular}>
            <label htmlFor="dataEveniment">
              Data evenimentului (luna / ziua / anul ) :
            </label>
            <input
              type="date"
              defaultValue={toDay}
              {...register("dataEveniment", {
                required: "Va rugam sa data cand are loc evenimentul",
              })}
              className=""
              id="dataEveniment"
              autoFocus
            />
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="oraEveniment">Ora preferata : </label>
            <input
              type="number"
              {...register("oraEveniment", {
                required: "Va rugam sa ora la care preferati sa venim",
              })}
              id="oraEveniment"
              autoFocus
            ></input>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
