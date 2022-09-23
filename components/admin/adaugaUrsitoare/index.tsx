import React, { useEffect } from "react";

import styles from "./adaugaUrsitoare.module.scss";
import Select from "react-select";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../../spinner/Spinner";

const AdaugaUrsitoare = ({ eveniment }) => {
  const [userChoice, setUserChoice] = useState([{ value: "", label: "" }]);
  const [loading, setLoading] = useState(false);
  const [ursi, setUrsitoare] = useState([]);
  const handleChange = (chioce) => {
    setUserChoice(chioce);
  };

  const options = ursi.map((u) => ({
    value: u._id,
    label: u.name,
  }));
  useEffect(() => {
    const fetchUrsitoare = async () => {
      setLoading(true);
      await axios.get("/api/ursitoare").then((res) => {
        setUrsitoare(res.data);
      });
      setLoading(false);
    };

    fetchUrsitoare();
  }, []);

  if (loading) return <Spinner />;
  return (
    <>
      {eveniment.ursitoare.length < 3 ? (
        <>
          <hr />
          <div className={styles.adaugUrsitoare}>
            <Select
              isMulti
              onChange={handleChange}
              options={options}
              name="ursitoare"
            />
            <button
              onClick={async () => {
                setLoading(true);
                userChoice.map((op) => {
                  const ursitoareId = op.value;
                  const rezId = eveniment._id;

                  axios.post("/api/admin/adauga-ursitoare", {
                    ursitoareId,
                    rezId,
                  });
                });
                setLoading(false);
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
              <h3>{ur.nume}</h3>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdaugaUrsitoare;
