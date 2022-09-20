import { useForm } from "react-hook-form";

import styles from "./Formular.module.scss";

import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils/error";
import { useState } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Spinner from "../../components/spinner/Spinner";

const Copil = dynamic(() => import("../../components/formular/copil"), {
  suspense: true,
});
const Nasi = dynamic(() => import("../../components/formular/nasi/Nasi"), {
  suspense: true,
});
const Eveniment = dynamic(() => import("../../components/formular/eveniment"), {
  suspense: true,
});
const RudeStrainatate = dynamic(
  () => import("../../components/formular/rudeStrainatate"),
  {
    suspense: true,
  },
);
const UnchiMatusi = dynamic(
  () => import("./../../components/formular/unchiMatusi/index"),
  {
    suspense: true,
  },
);

const FormularPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      frati: [{ nume: "", varsta: "" }],
      perechinasi: [{ nas: "", nasa: "" }],
      rudeStrainatate: [{ nume: "", gradRudenie: "", tara: "" }],
      "perechinasi.copii": [{ nume: "", varsta: "" }],
      locatieeveniment: { nume: "bacau", lat: "", lngL: "" },
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
    oraInceputPetrecere,
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
        oraInceputPetrecere,
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
        <Suspense fallback={<Spinner />}>
          <Copil control={control} register={register} />
          <UnchiMatusi control={control} register={register} />
          <Nasi
            getValues={getValues}
            setValue={setValue}
            control={control}
            register={register}
          />
          <RudeStrainatate control={control} register={register} />
          <Eveniment
            errors={errors}
            watch={watch}
            control={control}
            register={register}
          />
        </Suspense>
        <button
        // disabled={ disable }
        >
          Faceti Rezervarea
        </button>
      </form>
    </div>
  );
};
FormularPage.Auth = true;

export default FormularPage;
