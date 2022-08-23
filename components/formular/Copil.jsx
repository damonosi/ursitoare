import styles from "./Copil.module.scss";
import { useState } from "react";

import { useFieldArray } from "react-hook-form";

const Copil = ({ register, control }) => {
  const [styleUnu, setStyleDoi] = useState(false);
  const toDay = new Date().toLocaleDateString().substring(0, 10);
  const handleChange = () => {
    append();
    setStyleDoi(true);
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "frati",
  });

  return (
    <>
      <h1>Date copil</h1>
      <div className={styles.dateCopil}>
        <div className={styles.informatiiCopil}>
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

          <div className={styles.inp}>
            <input
              type="text"
              placeholder="Data nasterii (luna / ziua / anul )"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              {...register("datanastere", {
                required: "Va rugam sa data cand s-a nascut copilul",
              })}
              className=""
              id="datanastere"
            />
            <span className={styles.focusBg}></span>{" "}
          </div>
          <div className={styles.inp}>
            <input
              placeholder="&nbsp;"
              type="text"
              {...register("mama", {
                required: "Va rugam sa introduceti numele mamei",
              })}
              className=""
              id="mama"
            />
            <label className={styles.label} htmlFor="mama">
              Numele Mamei
            </label>
            <span className={styles.focusBg}></span>
          </div>
          <div className={styles.inp}>
            <input
              placeholder="&nbsp;"
              type="text"
              {...register("tata", {
                required: "Va rugam sa introduceti numele tatalui",
              })}
              className=""
              id="tata"
            />{" "}
            <label className={styles.label} htmlFor="tata">
              Numele Tatalui
            </label>
            <span className={styles.focusBg}></span>
          </div>
        </div>
        <h1>Frati/Surori</h1>
        <div className={styleUnu ? styles.frati : styles.frati2}>
          {fields.map((field, index) => (
            <div className={styles.randFormularFrati} key={field.id}>
              <div className={styles.inp}>
                <input
                  placeholder="&nbsp;"
                  type="text"
                  {...register(`frati[${index}].nume`)}
                  id="numeFrate"
                />
                <label className={styles.label} htmlFor="numeFrate">
                  Nume
                </label>
                <span className={styles.focusBg}></span>
              </div>

              <div className={styles.inp}>
                <input
                  placeholder="&nbsp;"
                  type="text"
                  {...register(`frati[${index}].varsta`)}
                  className=""
                  id="varstaFrate"
                />
                <label className={styles.label} htmlFor="varstaFrate">
                  Varsta
                </label>
                <span className={styles.focusBg}></span>
              </div>

              <button
                className={styles.closeBtn}
                type="button"
                onClick={() => remove(index)}
              >
                <span>X</span>
              </button>
            </div>
          ))}
          <button className={styles.butonAdauga} onClick={handleChange}>
            Adauga Frate/Sora
          </button>
        </div>
      </div>
    </>
  );
};

export default Copil;
