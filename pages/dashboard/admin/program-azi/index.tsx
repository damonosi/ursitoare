import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProgramAzi.module.scss";
import { useDate } from "./../../../../utils/hooks/useDate";

const ProgramulDeAzi = () => {
  const [rezervariAzi, setEvenimenteAzi] = useState([]);
  const { date } = useDate();
  console.log(date);

  useEffect(() => {
    const fetchRezervari = async () => {
      await axios.get("/api/admin/program-azi").then((res) => {
        setEvenimenteAzi(res.data);
      });
    };
    fetchRezervari();
  }, []);
  const evenimenteAziSortate = rezervariAzi.sort((a, b) => {
    return a.oraConfirmata - b.oraConfirmata;
  });
  return (
    <div className={styles.programAziContainer}>
      <h1>Evenimente {date}</h1>
      {evenimenteAziSortate.map((evAzi, index) => (
        <div key={evAzi._id} className={styles.casetaProgramAzi}>
          <h1>Eveniment #{index + 1}</h1>
          <div className={styles.containerInformatii}>
            <h2>Ajungem la ora</h2>
            <h3>{evAzi.oraConfirmata}.00</h3>
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
            <h3>{evAzi.locatieeveniment}</h3>
          </div>

          <div className={styles.containerInformatii}>
            <h2>Localitatea unde are loc petrecerea</h2>
            <h3>{evAzi.localitateeveniment}</h3>
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
      ))}
    </div>
  );
};

export default ProgramulDeAzi;
