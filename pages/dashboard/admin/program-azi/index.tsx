/*global google*/
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProgramAzi.module.scss";
import { useDate } from "./../../../../utils/hooks/useDate";
import Directii from "../../../../components/googleMaps/directii";
import Geocode from "react-geocode";

import Spinner from "./../../../../components/spinner/Spinner";
import ButonInnapoi from "./../../../../components/butoane/ButonInnapoi";

const ProgramulDeAzi = () => {
  const [loading, setLoading] = useState(false);

  const [rezervariAzi, setEvenimenteAzi] = useState([]);
  const { date } = useDate();

  useEffect(() => {
    setLoading(true);
    const fetchRezervari = async () => {
      await axios.get("/api/admin/program-azi").then((res) => {
        setEvenimenteAzi(res.data);
        setLoading(false);
      });
    };
    fetchRezervari();
  }, []);
  const evenimenteAziSortate = rezervariAzi.sort((a, b) => {
    return a.oraConfirmata - b.oraConfirmata;
  });
  Geocode.setApiKey(`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
  Geocode.setLanguage("ro");
  Geocode.setRegion("es");
  Geocode.setLocationType("ROOFTOP");

  const getGeocode = (adresa) =>
    Geocode.fromAddress(adresa).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const destinatie = { lat: null, lng: null };
        destinatie.lat = lat;
        destinatie.lng = lng;
        return destinatie;
      },
      (error) => {
        console.error(error);
      },
    );
  if (loading) {
    return <Spinner />;
  }

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
          <div className={styles.containerMapa}>
            <Directii destinatie={getGeocode(evAzi.locatieeveniment)} />
          </div>
        </div>
      ))}
      <ButonInnapoi />
    </div>
  );
};
ProgramulDeAzi.Auth = true;
ProgramulDeAzi.Admin = true;
export default ProgramulDeAzi;
