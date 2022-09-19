import styles from "./Eveniment.module.scss";

import Spinner from "./../../spinner/Spinner";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const MapaRezervare = dynamic(
  () => import("../../googleMaps/locatie-rezervare/index"),
  {
    suspense: true,
  },
);
const regNumar = new RegExp("^[0-9]+$");

const Eveniment = ({ register, control, watch, setValue, errors }) => {
  return (
    <>
      <h1>Detalii Eveniment </h1>
      <div className={styles.dateEveniment}>
        <div className={styles.inp}>
          <input
            placeholder="Data Evenimentului (luna / ziua / anul )"
            required
            onFocus={(e) => (e.target.type = "date")}
            {...register("dataeveniment", {
              required: true,
            })}
            className=""
            id="dataeveniment"
          />

          <span className={styles.focusBg}></span>
        </div>

        <div className={styles.inp}>
          <input
            placeholder="&nbsp;"
            type="text"
            {...register("oraInceputPetrecere", {
              required: true,
              pattern: {
                value: regNumar,
              },
            })}
            id="oraInceputPetrecere"
          />
          <label className={styles.label} htmlFor="oraInceputPetrecere">
            La ce ora incepe petrecerea?
          </label>
          <span className={styles.focusBg}></span>
          {errors.oraInceputPetrecere &&
            errors.oraInceputPetrecere.type === "required" && (
              <span className={styles.errorText}>
                Adaugati la ce ora a inceput petrecerea
              </span>
            )}
          {errors.oraInceputPetrecere &&
            errors.oraInceputPetrecere.type === "pattern" && (
              <span className={styles.errorText}>Adaugati o ora valida</span>
            )}
        </div>

        <div className={styles.inp}>
          <input
            placeholder="&nbsp;"
            type="tel"
            {...register("nrcontact", {
              required: true,
              pattern: {
                value: regNumar,
              },
            })}
            id="nrcontact"
          />

          <label className={styles.label} htmlFor="nrcontact">
            Numar de contact
          </label>
          <span className={styles.focusBg}></span>
          {errors.nrcontact && errors.nrcontact.type === "required" && (
            <span className={styles.errorText}>
              Adaugati un numar pe care va putem contacta
            </span>
          )}
          {errors.nrcontact && errors.nrcontact.type === "pattern" && (
            <span className={styles.errorText}>Adaugati un numar valid</span>
          )}
        </div>
        <div>
          <Suspense fallback={<Spinner />}>
            <MapaRezervare
              errors={errors}
              watch={watch}
              register={register}
              control={control}
              setValue={setValue}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Eveniment;
