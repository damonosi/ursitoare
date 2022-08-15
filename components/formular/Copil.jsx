import styles from "./Copil.module.scss";
import { useRef, useState } from "react";
const Copil = ({ register }) => {
  const [clicked, setClicked] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const toDay = new Date().toLocaleDateString().substring(0, 10);
  const frInput1 = useRef();
  const frInput2 = useRef();

  const handleAddFrate = () => {
    frInput1.current.style.display = "flex";
    console.log(frInput1.current.childNodes[3]);
    setClicked(!clicked);
  };
  const handleRemoveFrate = () => {
    frInput1.current.style.display = "none";
    frInput1.current.childNodes[1].value = "";
    frInput1.current.childNodes[3].value = "";
    setClicked(!clicked);
  };
  const handleRemoveFrate2 = () => {
    frInput2.current.style.display = "none";
    frInput2.current.childNodes[1].value = "";
    frInput2.current.childNodes[3].value = "";
    setClicked2(!clicked2);
  };
  const handleAddFrate2 = () => {
    frInput2.current.style.display = "flex";
    setClicked2(!clicked2);
  };
  return (
    <div className={styles.dateCopil}>
      <h1>Date copil</h1>
      <div className={styles.randFormular}>
        <label htmlFor="numecopil">Numele copilului </label>
        <input
          type="text"
          {...register("numecopil", {
            required: "Va rugam sa introduceti numele copilului",
          })}
          className=""
          id="numecopil"
          autoFocus
        ></input>
      </div>

      <div className={styles.randFormular}>
        <label htmlFor="datanastere">Data nasterii (luna / ziua / anul )</label>
        <input
          type="date"
          defaultValue={toDay}
          {...register("datanastere", {
            required: "Va rugam sa data cand s-a nascut copilul",
          })}
          className=""
          id="datanastere"
        />
      </div>
      <div className={styles.randFormular}>
        <label htmlFor="mama">Numele mamei </label>
        <input
          type="text"
          {...register("mama", {
            required: "Va rugam sa introduceti numele mamei",
          })}
          className=""
          id="mama"
        ></input>
      </div>

      <div className={styles.randFormular}>
        <label htmlFor="tata">Numele tatalui </label>
        <input
          type="text"
          {...register("tata", {
            required: "Va rugam sa introduceti numele tatalui",
          })}
          className=""
          id="tata"
        ></input>
      </div>
      <h1>Frati/Surori</h1>
      <div className={clicked ? styles.frati : styles.frati2}>
        <div className={styles.randFormularFrati}>
          <label htmlFor="numeFrate1">Nume </label>
          <input
            type="text"
            {...register("frate1.nume", {
              required: "Va rugam sa bifati daca au si alti copii ; ",
            })}
            className=""
            id="numeFrate1"
          ></input>
          <label htmlFor="varstaFrate1">Varsta </label>
          <input
            type="text"
            {...register("frate1.varsta", {
              required: "Va rugam sa bifati daca au si alti copii ; ",
            })}
            className=""
            id="varstaFrate1"
          ></input>
          {!clicked ? (
            <button onClick={handleAddFrate}>
              <span>Adauga frate/sora</span>
            </button>
          ) : (
            ""
          )}
        </div>

        <div
          className={styles.randFormularFrati}
          style={{ display: "none" }}
          ref={frInput1}
        >
          <label htmlFor="numeFrate2">Nume </label>
          <input
            type="text"
            {...register("frate2.nume")}
            className=""
            id="numeFrate"
          ></input>
          <label htmlFor="varstaFrate2">Varsta </label>
          <input
            type="text"
            {...register("frate2.varsta")}
            className=""
            id="varstaFrate2"
          ></input>
          {!clicked2 ? (
            <button onClick={handleAddFrate2}>
              <span>Adauga frate/sora</span>
            </button>
          ) : (
            ""
          )}

          <button className={styles.closeBtn} onClick={handleRemoveFrate}>
            <span>X</span>
          </button>
        </div>
        <div
          className={styles.randFormularFrati}
          style={{ display: "none" }}
          ref={frInput2}
        >
          <label htmlFor="numeFrate3">Nume </label>
          <input
            type="text"
            {...register("frate3.nume")}
            className=""
            id="numeFrate3"
          ></input>
          <label htmlFor="varstaFrate3">Varsta</label>
          <input
            type="text"
            {...register("frate3.varsta")}
            className=""
            id="varstaFrate3"
          ></input>
          {clicked3 ? (
            ""
          ) : (
            <button className={styles.closeBtn} onClick={handleRemoveFrate2}>
              <span>X</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Copil;
