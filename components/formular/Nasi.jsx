import { useRef, useState } from "react";
import styles from "./Nasi.module.scss";

const Nasi = ({ register }) => {
  const [nasi, setNasi] = useState(false);
  const [nasi2, setNasi2] = useState(false);
  const [nasi3, setNasi3] = useState(false);
  const [nasi4, setNasi4] = useState(false);

  const nsInput1 = useRef();
  const nsInput2 = useRef();
  const nsInput3 = useRef();
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    if (event.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const handleAddPerecheNasi = () => {
    nsInput1.current.style.display = "grid";
    console.log(nsInput1.current.childNodes[2].childNodes[1]);
    setNasi(!nasi);
  };

  const handleAddPerecheNasi2 = () => {
    nsInput2.current.style.display = "grid";
    console.log(nsInput1.current.childNodes[3]);
    setNasi2(!nasi2);
  };
  const handleRemoveNasi2 = () => {
    nsInput1.current.style.display = "none";
    nsInput1.current.childNodes[1].childNodes[1].value = "";
    nsInput1.current.childNodes[2].childNodes[1].value = "";
    setNasi2(!nasi2);
    setNasi(!nasi);
  };
  const handleAddPerecheNasi3 = () => {
    nsInput3.current.style.display = "grid";

    setNasi3(!nasi3);
    setNasi4(!nasi4);
  };
  const handleRemoveNasi3 = () => {
    nsInput2.current.style.display = "none";
    nsInput2.current.childNodes[1].childNodes[1].value = "";
    nsInput2.current.childNodes[2].childNodes[1].value = "";
    setNasi3(!nasi3);
  };
  const handleRemoveNasi4 = () => {
    nsInput3.current.style.display = "none";
    nsInput3.current.childNodes[1].childNodes[1].value = "";
    nsInput3.current.childNodes[2].childNodes[1].value = "";
    setNasi4(!nasi4);
  };

  return (
    <>
      <h1>Nasii</h1>
      <div className={nasi ? styles.nasi : styles.nasiDoi}>
        <div className={styles.pereche}>
          <h3>Pereche1</h3>
          <div className={styles.randFormular}>
            <label htmlFor="nasu">Nasul </label>
            <input
              type="text"
              {...register("perechinasi[0].nas")}
              className=""
              id="nasu"
            ></input>
          </div>

          <div className={styles.randFormular}>
            <label htmlFor="nasa">Nasa </label>
            <input
              type="text"
              {...register("perechinasi[0].nasa")}
              className=""
              id="nasa"
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="nasiCopii">Au copii ? </label>
            <input
              type="checkbox"
              {...register("perechinasi[0].aucopii")}
              className=""
              id="nasiCopii"
              onChange={handleChange}
            ></input>
          </div>
          {checked ? (
            <>
              <div className={styles.randFormular}>
                <label htmlFor="numeCpNasi">Nume</label>
                <input
                  type="text"
                  {...register("perechinasi[0].copii[0].nume")}
                  className=""
                  id="numeCpNasi"
                ></input>
              </div>
              <div className={styles.randFormular}>
                <label htmlFor="varstaCpNasi">Varsta</label>
                <input
                  type="text"
                  {...register("perechinasi[0].copii[0].varsta")}
                  className=""
                  id="varstaCpNasi"
                ></input>
              </div>
            </>
          ) : (
            ""
          )}
          {!nasi ? (
            <button onClick={handleAddPerecheNasi}>
              <span>Adauga pereche nasi</span>
            </button>
          ) : (
            ""
          )}
        </div>{" "}
        <div
          className={styles.pereche}
          style={{ display: "none" }}
          ref={nsInput1}
        >
          <h3>Pereche2</h3>
          <div className={styles.randFormular}>
            <label htmlFor="nasu">Nasul </label>
            <input
              type="text"
              {...register("perechinasi[1].nas")}
              className=""
              id="nasu"
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="nasa">Nasa </label>
            <input
              type="text"
              {...register("perechinasi[1].nasa")}
              className=""
              id="nasa"
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="nasiCopii">Au copii ? </label>
            <input
              type="checkbox"
              {...register("perechinasi[1].aucopii")}
              className=""
              id="nasiCopii"
            ></input>
          </div>
          {!nasi2 ? (
            <button onClick={handleAddPerecheNasi2}>
              <span>Adauga pereche nasi</span>
            </button>
          ) : (
            ""
          )}
          <button className={styles.closeBtn} onClick={handleRemoveNasi2}>
            <span>X</span>
          </button>
        </div>
        <div
          className={styles.pereche}
          style={{ display: "none" }}
          ref={nsInput2}
        >
          <h3>Pereche3</h3>
          <div className={styles.randFormular}>
            <label htmlFor="nasu">Nasul </label>
            <input
              type="text"
              {...register("perechinasi[2].nas")}
              className=""
              id="nasu"
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="nasa">Nasa </label>
            <input
              type="text"
              {...register("perechinasi[2].nasa")}
              className=""
              id="nasa"
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="nasiCopii">Au copii ? </label>
            <input
              type="checkbox"
              {...register("perechinasi[2].aucopii")}
              className=""
              id="nasiCopii"
            ></input>
          </div>
          {!nasi3 ? (
            <button onClick={handleAddPerecheNasi3}>
              <span>Adauga pereche nasi</span>
            </button>
          ) : (
            ""
          )}
          <button className={styles.closeBtn} onClick={handleRemoveNasi3}>
            <span>X</span>
          </button>
        </div>
        <div
          className={styles.pereche}
          style={{ display: "none" }}
          ref={nsInput3}
        >
          <h3>Pereche4</h3>
          <div className={styles.randFormular}>
            <label htmlFor="nasu">Nasul </label>
            <input
              type="text"
              {...register("perechinasi[3].nas")}
              className=""
              id="nasu"
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="nasa">Nasa </label>
            <input
              type="text"
              {...register("perechinasi[3].nasa")}
              className=""
              id="nasa"
            ></input>
          </div>
          <div className={styles.randFormular}>
            <label htmlFor="nasiCopii">Au copii ? </label>
            <input
              type="checkbox"
              {...register("perechinasi[3].aucopii")}
              className=""
              id="nasiCopii"
            ></input>
          </div>
          {!nasi4 ? (
            ""
          ) : (
            <button className={styles.closeBtn} onClick={handleRemoveNasi4}>
              <span>X</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Nasi;
