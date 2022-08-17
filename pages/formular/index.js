import { useForm } from "react-hook-form";

import styles from "./Formular.module.scss";

import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils/error";
import { useRef, useState } from "react";
import Copil from "./../../components/formular/Copil";
import Nasi from "../../components/formular/Nasi";
import Eveniment from "../../components/formular/Eveniment";
import { useSession } from "next-auth/react";

export default function FormularPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { data: session, status } = useSession();
  const user = session.user._id;
  const submitHandler = async ({
    numecopil,
    datanastere,
    mama,
    tata,
    frati,
    perechinasi,
    dataeveniment,
    oraeveniment,
    localitateeveniment,
    locatieeveniment,
    nrcontact,
  }) => {
    try {
      await axios.post("/api/form", {
        numecopil,
        datanastere,
        mama,
        tata,
        frati,
        perechinasi,
        dataeveniment,
        oraeveniment,
        localitateeveniment,
        locatieeveniment,
        nrcontact,
        user,
      });
      setDisable(true);
      toast.success("Rezervare facuta !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const [disable, setDisable] = useState(false);

  return (
    <div className={styles.formularContainer}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>Vreti sa faceti o rezervare?</h1>
        <h3>
          Completati formularul cu datele necesare si va vom contacta in cel mai
          scurt timp posibil
        </h3>
        <Copil register={register} />
        <Nasi register={register} />

        <Eveniment register={register} />
        <button disabled={disable}>Submit</button>
      </form>
    </div>
  );
}
FormularPage.Auth = true;
