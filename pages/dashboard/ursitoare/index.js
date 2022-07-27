import React, { useReducer, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getError } from "../../../utils/error";

import styles from "../Dashboard.module.scss";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CasetaEveniment from "../../../components/eveniment/CasetaEveniment";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, rezervari: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: true, error: action.payload };
    default:
      return state;
  }
}

export default function DashboardUrsitoarePage() {
  const [{ loading, error, rezervari }, dispatch] = useReducer(reducer, {
    loading: true,
    rezervari: [],
    error: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchProgramari = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/rezervari");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchProgramari();
  }, []);

  return (
    <div className={styles.containerDsh}>
      <h1>Rezervari clienti</h1>

      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <div className={styles.containerDashboard}>
          {rezervari.map((eveniment) => (
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

              {eveniment.frati.map((i) => (
                <div key={eveniment._id} className={styles.fratiContainer}>
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
                  axios.post(`/api/evenimente/${eveniment._id}/opteaza`);
                  e.currentTarget.disabled = true;
                  toast.success("Ai optat pentru eveniment");
                }}
              >
                Vreau sa merg !
              </button>
            </CasetaEveniment>
          ))}
        </div>
      )}

      <button
        onClick={() => {
          router.push("/dashboard/ursitoare/evenimentele-mele");
        }}
      >
        Vezi evenimentele tale
      </button>
    </div>
  );
}
