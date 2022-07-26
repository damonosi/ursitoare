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
    numecopil,
    datanastere,
    mama,
    tata,
    frati: { nume, varsta },
    nasi,
    dataeveniment,
    oraeveniment,
  }) => {
    try {
      await axios.post("/api/form", {
        numecopil,
        datanastere,
        mama,
        tata,
        frati: { nume, varsta },
        nasi,
        dataeveniment,
        oraeveniment,
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
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>Vreti sa faceti o rezervare?</h1>
        <h3>
          Completati formularul cu datele necesare si va vom contacta in cel mai
          scurt timp posibil
        </h3>
        <div className={styles.dateCopil}>
          <h1>Date copil</h1>
          <div className={styles.randFormular}>
            <label htmlFor="numecopil">Numele copilului : </label>
            <input
              type="text"
              {...register("numecopil", {
                required: "Va rugam sa introduceti numele copilului",
              })}
              className=""
              id="numecopil"
              autoFocus
            ></input>
          </div>

          <div className={styles.randFormular}>
            <label htmlFor="datanastere">
              Data nasterii (luna / ziua / anul ) :
            </label>
            <input
              type="date"
              defaultValue={toDay}
              {...register("datanastere", {
                required: "Va rugam sa data cand s-a naschut copilul",
              })}
              className=""
              id="datanastere"
              autoFocus
            />
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="mama">Numele mamei : </label>
            <input
              type="text"
              {...register("mama", {
                required: "Va rugam sa introduceti numele mamei",
              })}
              className=""
              id="mama"
              autoFocus
            ></input>
          </div>

          <div className={styles.randFormular}>
            <label htmlFor="tata">Numele tatalui : </label>
            <input
              type="text"
              {...register("tata", {
                required: "Va rugam sa introduceti numele tatalui",
              })}
              className=""
              id="tata"
              autoFocus
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="numeFrate">Numele Fratelui :</label>
            <input
              type="text"
              {...register("frati.nume", {
                required: "Va rugam sa bifati daca au si alti copii ; ",
              })}
              className=""
              id="numeFrate"
              autoFocus
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="varstaFrate">Varsta fratelui :</label>
            <input
              type="text"
              {...register("frati.varsta", {
                required: "Va rugam sa bifati daca au si alti copii ; ",
              })}
              className=""
              id="varstaFrate"
              autoFocus
            ></input>
          </div>

          <div className={styles.randFormular}>
            <label htmlFor="nasi">Numele nasilor : </label>
            <input
              type="text"
              {...register("nasi", {
                required: "Va rugam sa introduceti numele tatalui",
              })}
              className=""
              id="nasi"
              autoFocus
            ></input>
          </div>
        </div>
        <div className={styles.dateEveniment}>
          <h1>Data eveniment : </h1>
          <div className={styles.randFormular}>
            <label htmlFor="dataeveniment">
              Data evenimentului (luna / ziua / anul ) :
            </label>
            <input
              type="date"
              defaultValue={toDay}
              {...register("dataeveniment", {
                required: "Va rugam sa data cand are loc evenimentul",
              })}
              className=""
              id="dataeveniment"
              autoFocus
            />
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="oraeveniment">Ora preferata : </label>
            <input
              type="number"
              {...register("oraeveniment", {
                required: "Va rugam sa ora la care preferati sa venim",
              })}
              id="oraeveniment"
              autoFocus
            ></input>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
