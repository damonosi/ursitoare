import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import styles from "./CreatiEveniment.module.scss";
import { getError } from "../../../../utils/error";

import { useRouter } from "next/router";
import ContainerEveniment from "../../../../components/eveniment/ContainerEveniment";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Spinner from "../../../../components/spinner/Spinner";

const Eveniment = dynamic(
  () => import("./../../../../components/formular/eveniment/index"),
  {
    suspense: true,
  },
);
const CreatiEveniment = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
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
      addBorder(true);
      toast.success("Ai adaugat un Nou eveniment !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setTimeout(() => {
        router.reload();
      }, 1000);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const router = useRouter();
  const regText = new RegExp("[a-zA-Z]");
  return (
    <div className={styles.creatiEvenimentContainer}>
      <div
        className={borderColor ? styles.evenimentCreat : styles.creatiEveniment}
      >
        <ContainerEveniment>
          <h2>Eveniment nou</h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className={styles.inp}>
              <input
                placeholder="&nbsp;"
                type="text"
                {...register("numecopil", {
                  required: true,
                  pattern: {
                    value: regText,
                  },
                })}
                className=""
                id="numecopil"
                autoFocus
              />

              <label className={styles.label} htmlFor="numecopil">
                Numele Copilului
              </label>
              <span className={styles.focusBg}></span>
              {errors.numecopil && errors.numecopil.type === "required" && (
                <span role="alert" className={styles.errorText}>
                  adaugati numele copilului
                </span>
              )}
              {errors.numecopil && errors.numecopil.type === "pattern" && (
                <span role="alert" className={styles.errorText}>
                  adaugati un nume valid
                </span>
              )}
            </div>
            <Suspense fallback={<Spinner />}>
              <Eveniment
                errors={errors}
                setValue={setValue}
                watch={watch}
                register={register}
              />
            </Suspense>
            <div>
              <button className={styles.adaugaEvenimentButon}>
                <span>Adaugati Eveniment Nou</span>{" "}
              </button>
            </div>
          </form>
        </ContainerEveniment>
      </div>
    </div>
  );
};
CreatiEveniment.Auth = true;
CreatiEveniment.Admin = true;
export default CreatiEveniment;
