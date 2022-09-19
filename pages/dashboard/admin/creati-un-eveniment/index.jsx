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
import ContainerEveniment from "../../../../components/eveniment/ContainerEveniment";

const CreatiEveniment = () => {
  const { handleSubmit, register, reset, watch, setValue } = useForm();
  const [borderColor, addBorder] = useState(false);
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
      await axios.post("/api/form", {
        numecopil,
        dataeveniment,
        oraInceputPetrecere,
        locatieeveniment,
        nrcontact,
        user,
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const router = useRouter();
  return (
    <div className={styles.creatiEvenimentContainer}>
      <div
        className={borderColor ? styles.evenimentCreat : styles.creatiEveniment}
      >
        <ContainerEveniment>
          <h1>
            Creati un <br /> eveniment nou
          </h1>
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
            <Eveniment setValue={setValue} watch={watch} register={register} />
            <div>
              <button
                className={styles.adaugaEvenimentButon}
                onClick={() => {
                  toast.success("Ai adaugat un Nou eveniment !", {
                    position: toast.POSITION.BOTTOM_CENTER,
                  });
                  addBorder(true);
                  setTimeout(() => {
                    router.reload();
                  }, 2000);
                }}
              >
                <span>Adaugati Eveniment Nou</span>{" "}
              </button>
            </div>
          </form>
        </ContainerEveniment>
      </div>

      <div className={styles.containerButoane}>
        <ButonInnapoi />
        <div className={styles.butonNextConfirmatiContainer}>
          <button
            onClick={() => router.push("/dashboard/admin/organizati-traseul")}
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
CreatiEveniment.Auth = true;
CreatiEveniment.Admin = true;
export default CreatiEveniment;
