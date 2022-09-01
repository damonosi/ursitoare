import React, { useReducer, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getError } from "../../../utils/error";

import CasetaEveniment from "../../../components/eveniment/CasetaEveniment";

import styles from "../Dashboard.module.scss";
import { useRouter } from "next/router";

import Spinner from "../../../components/spinner/Spinner";
import ChangeDateOrder from "../../../utils/formatData";
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        rezervarileMele: action.payload,
        error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: true, error: action.payload };
    default:
      return state;
  }
}

export default function RezFacute() {
  const [{ loading, error, rezervarileMele }, dispatch] = useReducer(reducer, {
    loading: true,
    rezervarileMele: [],
    error: "",
  });
  const [azi, setAzi] = useState(new Date());
  const { status, data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
    } else {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);
  useEffect(() => {
    const fetchRezervari = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/rezervarile-mele", {
          headers: { _id: session.user._id },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchRezervari();
  }, [session?.user._id]);
  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const astazi = mm + "/" + dd + "/" + yyyy;
    const datAz = new Date(astazi);
    setAzi(datAz);
  }, []);

  return (
    <div className={styles.containerDsh}>
      <h1>Rezervarile Mele</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.containerDashboard}>
          {rezervarileMele.map((eveniment, index) => (
            <div key={index}>
              {new Date(eveniment.dataeveniment).getTime() > azi.getTime() ? (
                <CasetaEveniment eveniment={eveniment}>
                  <h1>{eveniment.numecopil}</h1>
                  <h2>
                    Data Nasterii : {ChangeDateOrder(eveniment.datanastere)}
                  </h2>
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
                  <div className={styles.fratiContainer}>
                    {eveniment.frati.map((fr) => (
                      <div key={fr._id}>
                        {fr.nume ? (
                          <div key={fr._id} className={styles.frateContainer}>
                            <h3>{fr.nume}</h3>
                            <hr />
                            <h3>{fr.varsta} ani</h3>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                  <h2>Perechi de nasi</h2>
                  <div className={styles.nasiContainer}>
                    {eveniment.perechinasi.map((perecheNasi) => (
                      <div key={perecheNasi._id}>
                        {perecheNasi.nas ? (
                          <div key={perecheNasi._id}>
                            <h3>{perecheNasi.nas}</h3>
                            <hr />
                            <h3>{perecheNasi.nasa}</h3>
                            <hr />
                            <>
                              {perecheNasi.aucopii ? (
                                perecheNasi.copii.map((cp) => (
                                  <div key={cp._id}>
                                    <h3>Nume{cp.nume}</h3>
                                    <h3>Varsta{cp.varsta}</h3>
                                  </div>
                                ))
                              ) : (
                                <h3>Nu au copii</h3>
                              )}
                            </>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                  <h2> Detalii eveniment</h2>
                  <div className={styles.detaliiEveniment}>
                    <h3>Restaurant/adresa : {eveniment.locatieeveniment}</h3>
                    <h3>Orasul : {eveniment.localitateeveniment}</h3>
                    <h3>
                      Data evenimentului{" "}
                      {ChangeDateOrder(eveniment.dataeveniment)}
                    </h3>
                    <h3>Ora {eveniment.oraeveniment}.00</h3>
                  </div>
                </CasetaEveniment>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

RezFacute.Auth = true;
