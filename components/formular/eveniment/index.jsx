import { useState } from "react";

import styles from "./Eveniment.module.scss";

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
            {...register("oraeveniment", {
              required: "Va rugam sa ora la care preferati sa venim",
            })}
            id="oraeveniment"
          />
          <label className={styles.label} htmlFor="oraeveniment">
            La ce ora doriti sa venim?
          </label>
          <span className={styles.focusBg}></span>
        </div>

        <div className={styles.inp}>
          <input
            placeholder="&nbsp;"
            type="text"
            {...register("localitateeveniment", {
              required:
                "Va rugam sa specificati localitatea unde are loc evenimentul",
            })}
            id="localitateeveniment"
          />
          <label className={styles.label} htmlFor="localitateeveniment">
            Localitate
          </label>
          <span className={styles.focusBg}></span>
        </div>

        <div className={styles.inp}>
          <input
            placeholder="&nbsp;"
            type="text"
            {...register("locatieeveniment", {
              required:
                "Va rugam sa specificati locatia unde are loc evenimentul",
            })}
            id="locatieeveniment"
          />
          <label className={styles.label} htmlFor="locatieeveniment">
            Restaurant/Adresa
          </label>
          <span className={styles.focusBg}></span>
        </div>

        <div className={styles.inp}>
          <input
            placeholder="&nbsp;"
            type="tel"
            {...register("nrcontact", {
              required: "Va rugam sa ora la care preferati sa venim",
            })}
            id="nrcontact"
          />
          <label className={styles.label} htmlFor="nrcontact">
            Numar de contact
          </label>
          <span className={styles.focusBg}></span>
        </div>
      </div>
    </>
  );
};

export default Eveniment;