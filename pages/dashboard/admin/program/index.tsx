/*global google*/
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProgramAzi.module.scss";
import { useDate } from "../../../../utils/hooks/useDate";
import Directii from "../../../../components/googleMaps/directii";

import Spinner from "../../../../components/spinner/Spinner";
import ButonInnapoi from "../../../../components/butoane/ButonInnapoi";
import Select from "react-select";
import ChangeDateOrder from "./../../../../utils/formatData";
import ContainerEveniment from "./../../../../components/eveniment/ContainerEveniment";

const Programul = () => {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ value: "", labe: "" });
  const [rezervariAzi, setEvenimenteAzi] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchRezervari = async () => {
      await axios.get("/api/admin/program").then((res) => {
        setEvenimenteAzi(res.data);
        setLoading(false);
      });
    };
    fetchRezervari();
  }, []);
  const evenimenteAziSortate = rezervariAzi.sort((a, b) => {
    return (
      new Date(a.dataeveniment).getTime() - new Date(b.dataeveniment).getTime()
    );
  });
  const sortarePeDate = evenimenteAziSortate.reduce(
    (group, evenimenteAziSortate) => {
      const { dataeveniment } = evenimenteAziSortate;
      group[dataeveniment] = group[dataeveniment] ?? [];
      group[dataeveniment].push(evenimenteAziSortate);
      return group;
    },
    {},
  );

  const optiuniSelect = Object.keys(sortarePeDate).map((data) => ({
    value: data,
    label: ChangeDateOrder(new Date(data)),
  }));
  const handleChangeDate = (selectedOption) => {
    console.log(selectedOption);
    setSelectedDate(selectedOption);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.programContainer}>
      <div
        style={{
          maxWidth: "30em",
          padding: "3em",
          textAlign: "center",
        }}
      >
        <h1> Program</h1>
        <Select options={optiuniSelect} onChange={handleChangeDate} />
      </div>
      <h1>
        {selectedDate.value ? (
          ChangeDateOrder(selectedDate.value)
        ) : (
          <div className={styles.selectDate}>
            <h3>ALEGETI O DATA</h3>
          </div>
        )}
      </h1>
      <div className={styles.programAziContainer}>
        {evenimenteAziSortate.map((evAzi, index) => {
          const destinatie = {
            lat: Number(evAzi.locatieeveniment.lat),
            lng: Number(evAzi.locatieeveniment.lng),
          };
          if (evAzi.dataeveniment === selectedDate.value) {
            return (
              <div key={evAzi._id}>
                <h1>Eveniment #{index + 1}</h1>
                <ContainerEveniment>
                  <div className={styles.faraHarta}>
                    <div className={styles.containerInformatii}>
                      <h2>Ajungem la ora</h2>
                      <h3>{evAzi.oraConfirmata}.00</h3>
                    </div>
                    <div className={styles.containerInformatii}>
                      <h2>Data</h2>
                      <h3>{evAzi.dataeveniment}</h3>
                    </div>
                    <div className={styles.containerInformatii}>
                      <h2>Numele Copilului </h2>
                      <h3>{evAzi.numecopil}</h3>
                    </div>
                    <div className={styles.containerInformatii}>
                      <h2>Petrecerea a inceput la ora </h2>
                      <h3>{evAzi.oraInceputPetrecere}.00</h3>
                    </div>

                    <div className={styles.containerInformatii}>
                      <h2>La ce restaurant are loc petrecerea</h2>
                      <h3>{evAzi.locatieeveniment.nume}</h3>
                    </div>

                    <div className={styles.containerInformatii}>
                      <h2>Numar de Contact </h2>
                      <h3>{evAzi.nrcontact}</h3>
                    </div>

                    <div className={styles.containerInformatii}>
                      <h2>Cu ce ursitoare merg </h2>
                      <h3>
                        {evAzi.ursitoare.map((urs, index) => (
                          <div key={index}>
                            <span>{urs.nume}</span>
                          </div>
                        ))}
                      </h3>
                    </div>
                  </div>

                  <Directii destinatie={destinatie} />
                </ContainerEveniment>
              </div>
            );
          }
        })}
      </div>
      <ButonInnapoi />
    </div>
  );
};
Programul.Auth = true;
Programul.Admin = true;
export default Programul;
