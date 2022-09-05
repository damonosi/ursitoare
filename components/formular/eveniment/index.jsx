import { useRef, useState } from "react";

import styles from "./Eveniment.module.scss";
import MapaRezervare from "../../googleMaps/locatie-rezervare/index";

const Eveniment = ({ register, control }) => {
  const toDay = new Date().toLocaleDateString().substring(0, 10);
  const [startDate, setStartDate] = useState(new Date());

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
          <MapaRezervare register={register} control={control} />
        </div>
      </div>
    </>
  );
};

export default Eveniment;
