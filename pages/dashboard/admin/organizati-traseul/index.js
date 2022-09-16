import axios from "axios";
import React, { useEffect, useState } from "react";
import ChangeDateOrder from "../../../../utils/formatData";

import styles from "./organizare.module.scss";
import Select from "react-select";

import ButonInnapoi from "../../../../components/butoane/ButonInnapoi";
import { Suspense } from "react";
import Spinner from "./../../../../components/spinner/Spinner";
import AlegeOra from "./../../../../components/organizati-traseul/alegeOra";

import dynamic from "next/dynamic";
const Directii = dynamic(
  () => import("../../../../components/googleMaps/directii"),
  {
    suspense: true,
  },
);

const OrganizariTraseul = () => {
  const [neconfirmate, setNeconfirmate] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchEvNeconfirmnate = async () => {
      await axios.get("/api/rezervari/neconfirmate").then((res) => {
        setNeconfirmate(res.data);
        setLoading(false);
      });
    };
    fetchEvNeconfirmnate();
  }, []);

  const neconfirmateSort = neconfirmate.sort((a, b) => {
    return (
      new Date(a.dataeveniment).getTime() - new Date(b.dataeveniment).getTime()
    );
  });

  const sortarePeDate = neconfirmateSort.reduce((group, neconfirmateSort) => {
    const { dataeveniment } = neconfirmateSort;
    group[dataeveniment] = group[dataeveniment] ?? [];
    group[dataeveniment].push(neconfirmateSort);
    return group;
  }, {});

  const optiuniSelect = Object.keys(sortarePeDate).map((data) => ({
    value: data,
    label: ChangeDateOrder(new Date(data)),
  }));
  const handleChangeDate = (selectedOption) => {
    setSelectedDate(selectedOption);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.organizareContainer}>
      <div
        style={{
          maxWidth: "30em",
          padding: "3em",
          textAlign: "center",
        }}
      >
        <h1> Pe ce data vreti sa Construiti traseul</h1>
        <Select options={optiuniSelect} onChange={handleChangeDate} />
      </div>

      <div className={styles.neconfirmateContainer}>
        {neconfirmateSort.map((eveniment, index) => {
          if (eveniment.dataeveniment === selectedDate.value) {
            const destinatie = {
              lat: Number(eveniment.locatieeveniment.lat),
              lng: Number(eveniment.locatieeveniment.lng),
            };
            return (
              <div className={styles.evenimentNeconfirmat} key={index}>
                <div className={styles.firstInfo}>
                  <h2> {eveniment.locatieeveniment.nume}</h2>
                  <hr />
                  <p>
                    Eventul incepe la ora {eveniment.oraInceputPetrecere}.00
                  </p>
                  <p> {eveniment.nrcontact}.00</p>
                </div>
                <div className={styles.containerMapa}>
                  <Suspense fallback={<Spinner />}>
                    <Directii destinatie={destinatie} />
                  </Suspense>
                </div>
                <div className={styles.adaugOra}>
                  <AlegeOra eveniment={eveniment} />{" "}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

OrganizariTraseul.Auth = true;
OrganizariTraseul.Admin = true;
export default OrganizariTraseul;