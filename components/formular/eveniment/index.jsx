import styles from "./Eveniment.module.scss";

import { useJsApiLoader } from "@react-google-maps/api";
import Spinner from "./../../spinner/Spinner";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const MapaRezervare = dynamic(
  () => import("../../googleMaps/locatie-rezervare/index"),
  {
    suspense: true,
  },
);

const Eveniment = ({ register, control }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
  });

  return (
    <>
      <h1>Detalii Eveniment </h1>
      <div className={styles.dateEveniment}>
        <div className={styles.inp}>
          <input
            placeholder="Data Evenimentului (luna / ziua / anul )"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            {...register("dataeveniment", {
              required: "Va rugam sa data cand are loc evenimentul",
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
              required: "Va rugam sa ora la ce ora incepe petrecerea",
            })}
            id="oraInceputPetrecere"
          />
          <label className={styles.label} htmlFor="oraInceputPetrecere">
            La ce ora incepe petrecerea?
          </label>
          <span className={styles.focusBg}></span>
        </div>

        <div className={styles.inp}>
          <input
            placeholder="&nbsp;"
            type="tel"
            {...register("nrcontact", {
              required: "Va rugam adaugati numarul de contact",
            })}
            id="nrcontact"
          />
          <label className={styles.label} htmlFor="nrcontact">
            Numar de contact
          </label>
          <span className={styles.focusBg}></span>
        </div>
        <div>
          {!isLoaded ? (
            <Spinner />
          ) : (
            <Suspense fallback={<Spinner />}>
              <MapaRezervare register={register} control={control} />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};

export default Eveniment;
