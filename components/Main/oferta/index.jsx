import styles from "./Oferta.module.scss";
import Collapsible from "react-collapsible";
import { useState } from "react";
import ButonRezerva from "./../../butoane/ButonRezerva";
import { useRouter } from "next/router";

const Oferta = () => {
  const [borderBotez, setBorderBotez] = useState(false);
  const [borderNunta, setBorderNunta] = useState(false);
  const [borderOnomastice, setBorderOnomastice] = useState(false);
  const router = useRouter();
  return (
    <>
      <h1>Oferte</h1>
      <div className={styles.oferteContainer}>
        <div className={styles.boteze}>
          <Collapsible
            transitionTime={800}
            transitionCloseTime={800}
            trigger={
              <button
                className={!borderBotez ? styles.openBtn : styles.closeBtn}
                onClick={() => setBorderBotez(!borderBotez)}
              >
                <>
                  {!borderBotez ? (
                    <h1>Apasati pentru a vedea oferta pentru botez</h1>
                  ) : (
                    <span>X</span>
                  )}
                </>
              </button>
            }
          >
            <h2>Despre Spectacol</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nemo
              fugiat numquam ad pariatur facilis voluptatum alias aliquam a
              quaerat?
            </p>
            <h2>Pret</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos ad
              nulla officia neque consectetur labore aliquam culpa, corporis
              saepe nostrum.
            </p>
            <ButonRezerva
              onClick={(e) => {
                e.preventDefault();
                router.push("/formular");
              }}
            />
          </Collapsible>
        </div>
        <div className={styles.nunti}>
          <Collapsible
            transitionTime={500}
            transitionCloseTime={800}
            trigger={
              <button
                className={!borderNunta ? styles.openBtn : styles.closeBtn}
                onClick={() => setBorderNunta(!borderNunta)}
              >
                <>
                  {!borderNunta ? (
                    <h1>Apasati pentru a vedea oferta pentru nunta</h1>
                  ) : (
                    <span>X</span>
                  )}
                </>
              </button>
            }
          >
            <h2>Despre Spectacol</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nemo
              fugiat numquam ad pariatur facilis voluptatum alias aliquam a
              quaerat?
            </p>
            <h2>Pret</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos ad
              nulla officia neque consectetur labore aliquam culpa, corporis
              saepe nostrum.
            </p>
            <ButonRezerva onClick={() => router.push("/formular")} />
          </Collapsible>
        </div>
        <div className={styles.onomastice}>
          <Collapsible
            transitionTime={500}
            transitionCloseTime={800}
            trigger={
              <button
                className={!borderOnomastice ? styles.openBtn : styles.closeBtn}
                onClick={() => setBorderOnomastice(!borderOnomastice)}
              >
                <>
                  {!borderOnomastice ? (
                    <h1>
                      Apasati pentru a vedea oferta pentru zile de nastere
                    </h1>
                  ) : (
                    <span>X</span>
                  )}
                </>
              </button>
            }
          >
            <h2>Despre Spectacol</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nemo
              fugiat numquam ad pariatur facilis voluptatum alias aliquam a
              quaerat?
            </p>
            <h2>Pret</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos ad
              nulla officia neque consectetur labore aliquam culpa, corporis
              saepe nostrum.
            </p>
            <ButonRezerva onClick={() => router.push("/formular")} />
          </Collapsible>
        </div>
      </div>
    </>
  );
};

export default Oferta;
