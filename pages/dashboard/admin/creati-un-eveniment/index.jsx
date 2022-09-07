import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import styles from "./CreatiEveniment.module.scss";
import { getError } from "../../../../utils/error";
import Eveniment from "./../../../../components/formular/eveniment/index";

const CreatiEveniment = () => {
  const [disable, setDisable] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm();
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
      setDisable(true);
      toast.success("Adaugat Evenimen Nou !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div>
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
        <button disabled={disable}>Adaugati Eveniment Nou</button>
      </form>
    </div>
  );
};

export default CreatiEveniment;
