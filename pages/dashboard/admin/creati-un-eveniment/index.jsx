import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import styles from "./CreatiEveniment.module.scss";
import { getError } from "../../../../utils/error";
import Eveniment from "./../../../../components/formular/eveniment/index";
import ButonInnapoi from "./../../../../components/butoane/ButonInnapoi";
import { useRouter } from "next/router";

const CreatiEveniment = () => {
  const [disable, setDisable] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const { data: session, status } = useSession();
  const user = session?.user._id;
  const submitHandler = async ({
    numecopil,
    dataeveniment,
    oraInceputPetrecere,
    locatieeveniment,
    nrcontact,
  }) => {
    try {
      setDisable(true);
      await axios.post("/api/form", {
        numecopil,
        dataeveniment,
        oraInceputPetrecere,
        locatieeveniment,
        nrcontact,
        user,
      });

      toast.success("Adaugat Evenimen Nou !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const router = useRouter();
  return (
    <div className={styles.creatiEvenimentContainer}>
      <div className={styles.creatiEveniment}>
        <h1>Creati un eveniment nou</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.inp}>
            <input
              placeholder="&nbsp;"
              type="text"
              {...register("numecopil", {
                required: "Va rugam sa introduceti numele copilului",
              })}
              className=""
              id="numecopil"
              autoFocus
            />
            <label className={styles.label} htmlFor="numecopil">
              Numele Copilului
            </label>
            <span className={styles.focusBg}></span>
          </div>
          <Eveniment register={register} />
          <div>
            <button disabled={disable}>
              <span>Adaugati Eveniment Nou</span>{" "}
            </button>
          </div>
        </form>
        <button
          onClick={() => {
            setDisable(false);
            reset();
          }}
        >
          <span>Vreau sa adaug inca un eveniment</span>
        </button>
      </div>
      <div className={styles.containerButoane}>
        <ButonInnapoi />
        <div className={styles.butonNextConfirmatiContainer}>
          <button
            onClick={() =>
              router.push("/dashboard/admin/confirmati-evenimentul")
            }
          >
            Confirmati Ora &gt;Evenimente
            <span
              className={`${styles.iconRight} ${styles.after}`}
              data-before="Confirma ora"
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatiEveniment;
