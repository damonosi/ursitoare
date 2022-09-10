import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./adaudaUrsitoare.module.scss";
import CasetaEveniment from "../../../../components/eveniment/CasetaEveniment";
import { toast } from "react-toastify";
import ButonInnapoi from "./../../../../components/butoane/ButonInnapoi";

const AdaugaUrsitoare = () => {
  const [rezervari, setRezervari] = useState([]);
  const [ursitoare, setUrsitoare] = useState([]);
  const [userChoice, setUserChoice] = useState("");
  useEffect(() => {
    const fetchRezervari = async () => {
      await axios.get("/api/rezervari/confirmate").then((res) => {
        setRezervari(res.data);
      });
    };
    fetchRezervari();
  }, []);
  useEffect(() => {
    const fetchUrsitoare = async () => {
      await axios.get("/api/ursitoare").then((res) => {
        setUrsitoare(res.data);
      });
    };
    fetchUrsitoare();
  }, []);
  const handleChange = (chioce) => {
    setUserChoice(chioce);
  };
  const options = ursitoare.map((u) => ({
    value: u._id,
    label: u.name,
  }));
  const rezSortate = rezervari.sort((a, b) => {
    return (
      new Date(a.dataeveniment).getTime() - new Date(b.dataeveniment).getTime()
    );
  });
  return (
    <div>
      <h1>Adauga ursitoarele</h1>
      {rezSortate.map((eveniment, index) => (
        <div key={index}>
          <CasetaEveniment eveniment={eveniment}>
            <h1>pe ce data are loc evenimentul {eveniment.dataeveniment}</h1>
            <h1>la ce ora incepe petrecerea {eveniment.oraInceputPetrecere}</h1>
            <h1>La ce ora ajungem la eveniment {eveniment.oraConfirmata}</h1>
            <h1>Restaurant {eveniment.locatieeveniment}</h1>

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
                        axios.post("/api/admin/adauga-ursitoare", {
                          ursitoareId,
                          rezId,
                        });
                      });
                      toast.success("Ai adaugat ursitoare pentru eveniment");
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
                    <button>Schimba ursitoarea</button>
                  </div>
                ))}
              </div>
            )}
          </CasetaEveniment>
        </div>
      ))}
      <ButonInnapoi />
    </div>
  );
};

AdaugaUrsitoare.Auth = true;
AdaugaUrsitoare.Admin = true;
export default AdaugaUrsitoare;
