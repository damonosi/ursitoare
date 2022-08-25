import { useForm, useFieldArray } from "react-hook-form";

import styles from "./Formular.module.scss";

import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils/error";
import { useRef, useState } from "react";
import Copil from "../../components/formular/copil";
import Nasi from "../../components/formular/nasi/Nasi";
import Eveniment from "../../components/formular/eveniment";
import { useSession } from "next-auth/react";
import RudeStrainatate from "../../components/formular/rudeStrainatate";
import UnchiMatusi from "./../../components/formular/unchiMatusi/index";

export default function FormularPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      frati: [{ nume: "", varsta: "" }],
      perechinasi: [{ nas: "", nasa: "" }],
      rudeStrainatate: [{ nume: "", gradRudenie: "", tara: "" }],
      "perechinasi.copii": [{ nume: "", varsta: "" }],
    },
  });
  const { data: session, status } = useSession();
  const user = session.user._id;
  const submitHandler = async ({
    numecopil,
    datanastere,
    mama,
    tata,
    frati,
    unchiMatusi,
    perechinasi,

    rudeStrainatate,
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
        unchiMatusi,
        frati,
        perechinasi,
        rudeStrainatate,
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
        <div className={styles.introForm}>
          <h1>Vreti sa faceti o rezervare?</h1>
          <h3>
            Completati formularul cu datele necesare <br /> si va vom contacta
            in cel mai scurt timp posibil !
          </h3>
        </div>
        <hr />
        <Copil control={control} register={register} />
        <UnchiMatusi control={control} register={register} />
        <Nasi
          getValues={getValues}
          setValue={setValue}
          control={control}
          register={register}
        />
        <RudeStrainatate control={control} register={register} />
        <Eveniment control={control} register={register} />
        <button
        // disabled={ disable }
        >
          Faceti Rezervarea
        </button>
      </form>
    </div>
  );
}
FormularPage.Auth = true;
