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

import ChangeDateOrder from "../../../utils/formatData";
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
  const [azi, setAzi] = useState(new Date());

  const { status, data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  const handleChange = (chioce) => {
    setUserChoice(chioce);
  };
  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const astazi = mm + "/" + dd + "/" + yyyy;
    const datAz = new Date(astazi);
    setAzi(datAz);
  }, []);

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
  const rezSort = rezervari.sort((a, b) => {
    return (
      new Date(a.dataeveniment).getTime() - new Date(b.dataeveniment).getTime()
    );
  });
  console.log(rezSort);
  return (
    <div className={styles.containerDsh}>
      <h1>Rezervari clienti</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.containerDashboard}>
          {rezSort.map((eveniment) => (
            <div key={eveniment._id}>
              {new Date(eveniment.dataeveniment).getTime() > azi.getTime() ? (
                <CasetaEveniment eveniment={eveniment}>
                  <div>
                    <h2>
                      Data Nasterii {ChangeDateOrder(eveniment.datanastere)}
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
                        <>
                          {fr.nume ? (
                            <div key={fr._id} className={styles.frateContainer}>
                              <h3>{fr.nume}</h3>
                              <hr />
                              <h3>{fr.varsta} ani</h3>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </div>
                    <h2>Perechi de nasi</h2>
                    <div className={styles.nasiContainer}>
                      {eveniment.perechinasi.map((perecheNasi) => (
                        <>
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
                        </>
                      ))}
                    </div>

                    <h2> Detalii eveniment</h2>
                    <div className={styles.detaliiEveniment}>
                      <h3>Localitate : {eveniment.localitateeveniment}</h3>
                      <h3>Restaurant/Adresa : {eveniment.locatieeveniment}</h3>
                      <h3>
                        Data evenimentului :
                        {ChangeDateOrder(eveniment.dataeveniment)}
                      </h3>
                      <h3>Ora {eveniment.oraeveniment}.00</h3>
                    </div>
                    <div className={styles.contact}>
                      <h3>Numar de contact </h3>
                      <h4>{eveniment.nrcontact}</h4>
                    </div>
                    {eveniment.ursitoare.length < 3 ? (
                      <>
                        <h1>Adauga ursitoare</h1>

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
                              });
                              toast.success(
                                "Ai adaugat ursitoare pentru eveniment",
                              );
                            }}
                          >
                            Adaga ursitoarele care merg la eveniment
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className={styles.ursContainer}>
                        <h1>Ursitoare</h1>
                        {eveniment.ursitoare.map((ur) => (
                          <div key={ur._id}>
                            <h3>{ur.name}</h3>
                          </div>
                        ))}
                      </div>
                    )}
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

AdminDashboard.Admin = true;
