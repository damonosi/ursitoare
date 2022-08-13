import { useForm } from "react-hook-form";

import styles from "./Formular.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils/error";
import { useEffect, useRef, useState } from "react";

export default function FormularPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const submitHandler = async ({
    numecopil,
    datanastere,
    mama,
    tata,
    frate1,
    frate2,
    frate3,
    nasi,
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
        frate1,
        frate2,
        frate3,
        nasi,
        dataeveniment,
        oraeveniment,
        localitateeveniment,
        locatieeveniment,
        nrcontact,
      });
      toast.success("Rezervare facuta !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const [clicked, setClicked] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const frInput1 = useRef();
  const frInput2 = useRef();

  const toDay = new Date().toLocaleDateString().substring(0, 10);
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
    <div className={styles.formularContainer}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>Vreti sa faceti o rezervare?</h1>
        <h3>
          Completati formularul cu datele necesare si va vom contacta in cel mai
          scurt timp posibil
        </h3>
        <div className={styles.dateCopil}>
          <h1>Date copil</h1>
          <div className={styles.randFormular}>
            <label htmlFor="numecopil">Numele copilului : </label>
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
            <label htmlFor="datanastere">
              Data nasterii (luna / ziua / anul ) :
            </label>
            <input
              type="date"
              defaultValue={toDay}
              {...register("datanastere", {
                required: "Va rugam sa data cand s-a nascut copilul",
              })}
              className=""
              id="datanastere"
              autoFocus
            />
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="mama">Numele mamei : </label>
            <input
              type="text"
              {...register("mama", {
                required: "Va rugam sa introduceti numele mamei",
              })}
              className=""
              id="mama"
              autoFocus
            ></input>
          </div>

          <div className={styles.randFormular}>
            <label htmlFor="tata">Numele tatalui : </label>
            <input
              type="text"
              {...register("tata", {
                required: "Va rugam sa introduceti numele tatalui",
              })}
              className=""
              id="tata"
              autoFocus
            ></input>
          </div>
          <h1>Frati/Surori</h1>
          <div className={styles.frati}>
            <div className={styles.randFormularFrati}>
              <label htmlFor="numeFrate1">Nume </label>
              <input
                type="text"
                {...register("frate1.nume", {
                  required: "Va rugam sa bifati daca au si alti copii ; ",
                })}
                className=""
                id="numeFrate1"
                autoFocus
              ></input>
              <label htmlFor="varstaFrate1">Varsta </label>
              <input
                type="text"
                {...register("frate1.varsta", {
                  required: "Va rugam sa bifati daca au si alti copii ; ",
                })}
                className=""
                id="varstaFrate1"
                autoFocus
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
              <label htmlFor="numeFrate2">Numele </label>
              <input
                type="text"
                {...register("frate2.nume")}
                className=""
                id="numeFrate"
                autoFocus
              ></input>
              <label htmlFor="varstaFrate2">Varsta </label>
              <input
                type="text"
                {...register("frate2.varsta")}
                className=""
                id="varstaFrate2"
                autoFocus
              ></input>
              {!clicked2 ? (
                <button onClick={handleAddFrate2}>
                  <span>Adauga frate/sora</span>
                </button>
              ) : (
                ""
              )}

              <button onClick={handleRemoveFrate}>
                <span>X</span>
              </button>
            </div>
            <div
              className={styles.randFormularFrati}
              style={{ display: "none" }}
              ref={frInput2}
            >
              <label htmlFor="numeFrate3">Numele </label>
              <input
                type="text"
                {...register("frate3.nume")}
                className=""
                id="numeFrate3"
                autoFocus
              ></input>
              <label htmlFor="varstaFrate3">Varsta</label>
              <input
                type="text"
                {...register("frate3.varsta")}
                className=""
                id="varstaFrate3"
                autoFocus
              ></input>
              {clicked3 ? (
                ""
              ) : (
                <button onClick={handleRemoveFrate2}>
                  <span>X</span>
                </button>
              )}
            </div>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="nasi">Numele nasilor : </label>
            <input
              type="text"
              {...register("nasi", {
                required: "Va rugam sa introduceti numele tatalui",
              })}
              className=""
              id="nasi"
              autoFocus
            ></input>
          </div>
        </div>
        <div className={styles.dateEveniment}>
          <h1>Data eveniment : </h1>
          <div className={styles.randFormular}>
            <label htmlFor="dataeveniment">
              Data evenimentului (luna / ziua / anul ) :
            </label>
            <input
              type="date"
              defaultValue={toDay}
              {...register("dataeveniment", {
                required: "Va rugam sa data cand are loc evenimentul",
              })}
              className=""
              id="dataeveniment"
              autoFocus
            />
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="oraeveniment">Ora preferata : </label>
            <input
              type="number"
              {...register("oraeveniment", {
                required: "Va rugam sa ora la care preferati sa venim",
              })}
              id="oraeveniment"
              autoFocus
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="localitateeveniment">
              Localitatea unde are loc petrecerea :{" "}
            </label>
            <input
              type="text"
              {...register("localitateeveniment", {
                required:
                  "Va rugam sa specificati localitatea unde are loc evenimentul",
              })}
              id="localitateeveniment"
              autoFocus
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="locatieeveniment">Unde are loc petrecerea : </label>
            <input
              type="text"
              {...register("locatieeveniment", {
                required:
                  "Va rugam sa specificati locatia unde are loc evenimentul",
              })}
              id="locatieeveniment"
              autoFocus
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="nrcontact">Numar de Telefon : </label>
            <input
              type="tel"
              {...register("nrcontact", {
                required: "Va rugam sa ora la care preferati sa venim",
              })}
              id="nrcontact"
              autoFocus
            ></input>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
FormularPage.Auth = true;
