import axios from "axios";
import React, { useEffect, useState } from "react";
import ChangeDateOrder from "../../../../utils/formatData";

import styles from "./organizare.module.scss";
import Select from "react-select";
import { toast } from "react-toastify";
import ButonInnapoi from "../../../../components/butoane/ButonInnapoi";
import Geocode from "react-geocode";
import Directii from "../../../../components/googleMaps/directii";
import Spinner from "./../../../../components/spinner/Spinner";

const OrganizariTraseul = () => {
  const [neconfirmate, setNeconfirmate] = useState([]);
  const [userChoice, setUserChoice] = useState("");
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
    <div className={styles.neconfirmateContainer}>
      <h1> Pe ce data vreti sa Construiti traseul</h1>
      <Select options={optiuniSelect} onChange={handleChangeDate} />
      {neconfirmateSort.map((eveniment, index) => {
        if (eveniment.dataeveniment === selectedDate.value) {
          return (
            <div className={styles.neconfirmatContainer} key={index}>
              <hr />
              <h2> {ChangeDateOrder(eveniment.dataeveniment)}</h2>

              <h2> Restaurant {eveniment.locatieeveniment}</h2>
              <h2>Eventul incepe la ora {eveniment.oraInceputPetrecere}</h2>
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
                    toast.success(
                      "Ai confirmat evenimentu si adaugat ora de sosire",
                    );
                  }}
                >
                  Adaga intervalul orar in care putem ajunge
                </button>
              </div>
              <div className={styles.containerMapa}>
                <Directii destinatie={getGeocode(eveniment.locatieeveniment)} />
              </div>
            </div>
          );
        }
      })}
      <ButonInnapoi />
    </div>
  );
};

OrganizariTraseul.Auth = true;
OrganizariTraseul.Admin = true;
export default OrganizariTraseul;
