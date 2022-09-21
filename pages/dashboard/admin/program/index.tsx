import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProgramAzi.module.scss";

import Directii from "../../../../components/googleMaps/directii";

import Spinner from "../../../../components/spinner/Spinner";
import Select from "react-select";
import ChangeDateOrder from "./../../../../utils/formatData";
import ContainerEveniment from "./../../../../components/eveniment/ContainerEveniment";

import { BsWhatsapp } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";

const ModificaOra = dynamic(
  () => import("../../../../components/admin/organizati-traseul/ModificaOra"),
  {
    suspense: true,
  },
);

const Programul = () => {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ value: "", labe: "" });
  const [rezervariAzi, setEvenimenteAzi] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchRezervari = async () => {
      await axios.get("/api/admin/program").then((res) => {
        setEvenimenteAzi(res.data);
      });
    };
    fetchRezervari();
    setLoading(false);
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
  console.log(optiuniSelect.length);
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
            {optiuniSelect.length === 0 ? (
              <>
                <h4>Nu aveti evenimente viitoare !</h4>

                <Link href="/dashboard/admin/organizati-traseul">
                  <a>
                    <button>Mergeti sa va organizati traseele </button>
                  </a>
                </Link>
              </>
            ) : (
              <h4>ALEGETI O DATA</h4>
            )}
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
              <div className={styles.cuTitle} key={evAzi._id}>
                <div className={styles.numarEveniment}>
                  <h1>#{index + 1}</h1>
                </div>
                <ContainerEveniment>
                  <div className={styles.faraHarta}>
                    <div className={styles.containerInformatii}>
                      <h2>Copil {evAzi.numecopil}</h2>
                    </div>
                    <div className={styles.containerInformatii}>
                      <h2>Ajungem la {evAzi.oraConfirmata}.00</h2>
                      <Suspense fallback={<Spinner />}>
                        <ModificaOra evenimentId={evAzi._id} />
                      </Suspense>
                    </div>

                    <div className={styles.containerInformatii}>
                      <h3>
                        <MdLocationOn />
                        {evAzi.locatieeveniment.nume}
                      </h3>
                    </div>

                    <div className={styles.containerInformatii}>
                      <h2>
                        Petrecerea a inceput la ora {evAzi.oraInceputPetrecere}
                        .00
                      </h2>
                    </div>

                    <div className={styles.containerInformatii}>
                      <h3>
                        <a href={`https://wa.me/+40${evAzi.nrcontact}`}>
                          <BsWhatsapp /> <br /> {evAzi.nrcontact}
                        </a>
                      </h3>
                    </div>

                    <div className={styles.containerInformatii}>
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
    </div>
  );
};
Programul.Auth = true;
Programul.Admin = true;
export default Programul;
