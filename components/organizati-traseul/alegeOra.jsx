import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

import styles from "./organizareComponent.module.scss";
const AlegeOra = ({ eveniment }) => {
  const [userChoice, setUserChoice] = useState("");
  const handleChange = (e) => {
    setUserChoice(e);
  };
  const oreZi = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const optiuniOre = oreZi.map((u) => ({
    value: u,
    label: u,
  }));

  return (
    <>
      <Select
        isMulti={false}
        onChange={handleChange}
        options={optiuniOre}
        name="ora"
      />
      <button
        className={styles.butonAdaugaOra}
        onClick={async () => {
          const oraValue = userChoice.value;
          const evenimentId = eveniment._id;
          console.log("ora", oraValue);
          console.log("id", evenimentId);
          axios.post("/api/rezervari/confirmare-rezervare", {
            oraValue,
            evenimentId,
          });
          toast.success("Ai confirmat evenimentu si adaugat ora de sosire");
        }}
      >
        <span> Adauga intervalul orar in care putem ajunge</span>
      </button>
    </>
  );
};

export default AlegeOra;
