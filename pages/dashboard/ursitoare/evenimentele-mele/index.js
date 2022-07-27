import React, { useReducer, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getError } from "../../../../utils/error";

import CasetaEveniment from "../../../../components/eveniment/CasetaEveniment";

import styles from "../../Dashboard.module.scss";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Spinner from "./../../../../components/spinner/Spinner";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        evenimenteleMele: action.payload,
        error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: true, error: action.payload };
    default:
      return state;
  }
}

export default function EvenimenteleMele() {
  const [{ loading, error, evenimenteleMele }, dispatch] = useReducer(reducer, {
    loading: true,
    evenimenteleMele: [],
    error: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchProgramari = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/rezervari/evenimentele-mele");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchProgramari();
  }, []);
  const flatRez = evenimenteleMele.flatMap((num) => num);
  return (
    <div className={styles.containerDsh}>
      <h1>Evenimentele Mele</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.containerDashboard}>
          {flatRez.map((eveniment) => (
            <CasetaEveniment key={eveniment._id}>
              <h1>{eveniment.numecopil}</h1>
              <h2>Data Nasterii : {eveniment.datanastere}</h2>
              <div>
                <h2>Parinti</h2>
                <div className={styles.parintiContainer}>
                  <div className={styles.parintiContainerMic}>
                    <h3>Mama </h3>
                    <hr />
                    <h3> {eveniment.mama}</h3>
                  </div>
                  <div className={styles.parintiContainerMic}>
                    <h3>Tata</h3>
                    <hr />
                    <h3> {eveniment.tata}</h3>
                  </div>
                </div>
              </div>
              <br />
              <h2>Frati/ Surori</h2>

              {eveniment.frati.map((i, index) => (
                <div key={index} className={styles.fratiContainer}>
                  <h3>{i.nume}</h3>
                  <hr />
                  <h3>{i.varsta} ani</h3>
                </div>
              ))}
              <h2> Detalii eveniment</h2>
              <div className={styles.detaliiEveniment}>
                <h3>Data evenimentului {eveniment.dataeveniment}</h3>
                <h3>Ora {eveniment.oraeveniment}.00</h3>
              </div>
              <button
                onClick={async (e) => {
                  await axios.post(`/api/evenimente/${eveniment._id}/renunta`);

                  router.reload();
                  toast.success("Ai renuntat la eveniment");
                }}
              >
                Nu mai vreau / pot sa merg
              </button>
            </CasetaEveniment>
          ))}
        </div>
      )}
    </div>
  );
}
