import React, { useReducer, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getError } from "../../../utils/error";

import styles from "../Dashboard.module.scss";
import CasetaEveniment from "../../../components/eveniment/CasetaEveniment";
import Spinner from "../../../components/spinner/Spinner";

import Select from "react-select";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

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

export default function AdminDashboard() {
  const [{ loading, error, rezervari }, dispatch] = useReducer(reducer, {
    loading: true,
    rezervari: [],
    error: "",
  });
  const [ursitoare, setUrsitoare] = useState([]);
  const [userChoice, setUserChoice] = useState("");

  const { status, data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  const handleChange = (chioce) => {
    setUserChoice(chioce);
  };

  useEffect(() => {
    if (session?.user.isadmin) {
    } else {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);
  useEffect(() => {
    const fetchUrsitoare = async () => {
      await axios.get("/api/ursitoare").then((res) => {
        setUrsitoare(res.data);
      });
    };
    fetchUrsitoare();
  }, []);
  const options = ursitoare.map((u) => ({
    value: u._id,
    label: u.name,
  }));

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
        <Spinner />
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
              <div className={styles.adaugUrsitoare}>
                <Select
                  isMulti
                  onChange={handleChange}
                  options={options}
                  name="ursitoare"
                />
                <button
                  onClick={async () => {
                    userChoice.map((op) => {
                      const ursitoareId = op.value;
                      const rezId = eveniment._id;
                      axios.post("/api/adauga-ursitoare", {
                        ursitoareId,
                        rezId,
                      });

                      toast.success("Ai optat pentru eveniment");
                    });
                  }}
                >
                  Adaga ursitoarele care merg la eveniment
                </button>
              </div>
            </CasetaEveniment>
          ))}
        </div>
      )}
    </div>
  );
}

AdminDashboard.Admin = true;
