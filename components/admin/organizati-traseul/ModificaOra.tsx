import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./modifica.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { IconContext } from "react-icons";
import { GrStatusGood } from "react-icons/gr";
import Spinner from "../../spinner/Spinner";

const ModificaOra = (evenimentId) => {
  const [userChoice, setUserChoice] = useState({ value: "", label: "" });
  const [inchis, setDeschisModifica] = useState(false);
  const [deschisModifica, setDeschis] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleChange = (chioce) => {
    setUserChoice(chioce);
  };
  const oreZi = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const optiuniOre = oreZi.map((u) => ({
    value: u,
    label: u,
  }));
  const handleOpenModificaOra = () => {
    setDeschisModifica(!inchis);
    setDeschis(!deschisModifica);
  };
  const router = useRouter();
  const evId = evenimentId.evenimentId;
  const handleModificaOra = async () => {
    const oraValue = userChoice.value;
    setLoading(true);
    await axios.post("/api/rezervari/confirmare-rezervare", {
      oraValue,
      evId,
    });
    setLoading(false);
    setTimeout(() => {
      router.reload();
    }, 1000);
    toast.success("Ora A Fost Modificata !");
  };
  if (loading) return <Spinner />;
  return (
    <div className={styles.oraContainer}>
      {deschisModifica ? (
        <button onClick={handleOpenModificaOra}>Modificati Ora</button>
      ) : (
        <span className={styles.closeButton} onClick={handleOpenModificaOra}>
          X
        </span>
      )}

      {!inchis ? (
        ""
      ) : (
        <div className={styles.adaugOra}>
          <Select
            isMulti={false}
            onChange={handleChange}
            options={optiuniOre}
            name="ora"
          />
          <div className={styles.iconPositioner}>
            <div className={styles.iconContainer}>
              <GrStatusGood onClick={handleModificaOra} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModificaOra;
