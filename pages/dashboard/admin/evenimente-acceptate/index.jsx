import axios from "axios";
import React, { useEffect, useState } from "react";
import ChangeDateOrder from "../../../../utils/formatData";

import styles from "./Acceptate.module.scss";
import Select from "react-select";
import { toast } from "react-toastify";

const AccepaCerere = () => {
  const [neconfirmate, setNeconfirmate] = useState([]);
  const [userChoice, setUserChoice] = useState("");
  useEffect(() => {
    const fetchEvNeconfirmnate = async () => {
      await axios.get("/api/rezervari/confirmate").then((res) => {
        setNeconfirmate(res.data);
      });
    };
    fetchEvNeconfirmnate();
  }, []);
  const handleChange = (chioce) => {
    setUserChoice(chioce);
  };
  const neconfirmateSort = neconfirmate.sort((a, b) => {
    return (
      new Date(a.dataeveniment).getTime() - new Date(b.dataeveniment).getTime()
    );
  });
  const oreZi = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const optiuniOre = oreZi.map((u) => ({
    value: u,
    label: u,
  }));

  return (
    <div className={styles.neconfirmateContainer}>
      <h1> Evenimente Confirmate</h1>
      {neconfirmateSort.map((eveniment, index) => (
        <div className={styles.confirmatContainer} key={index}>
          <h1>Eveniment #{index + 1}</h1>
          <hr />
          <h2> {ChangeDateOrder(eveniment.dataeveniment)}</h2>
          <h2> Localitate {eveniment.localitateeveniment}</h2>
          <h2> Restaurant {eveniment.locatieeveniment}</h2>
          <h2> Ajungem la ora {eveniment.oraConfirmata}</h2>
          <div className={styles.adaugOra}>
            <Select
              isMulti={false}
              onChange={handleChange}
              options={optiuniOre}
              name="ora"
            />
            <button
              onClick={async () => {
                const oraValue = userChoice.value;
                const evenimentId = eveniment._id;
                axios.post("/api/rezervari/confirmare-rezervare", {
                  oraValue,
                  evenimentId,
                });
                toast.success("Ai modificat ora la care ajungeti");
              }}
            >
              Modifica ora la care ajungem
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

AccepaCerere.Admin = true;
export default AccepaCerere;