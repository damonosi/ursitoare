import { useRef, useState } from "react";
import styles from "./Nasi.module.scss";
import { useFieldArray } from "react-hook-form";
import { ConditionalInput } from "./CopiiNasi";

const Nasi = ({ register, control }) => {
  const [stil1, setStil2] = useState(false);

  const handleAdaugaNasi = () => {
    nasiAppend();
    setStil2(true);
  };
  const {
    fields: nasiFields,
    append: nasiAppend,
    remove: removeNasi,
  } = useFieldArray({
    control,
    name: "perechinasi",
  });

  return (
    <div className={styles.dateNasi}>
      <h1>Nasii</h1>
      <div className={stil1 ? styles.nasi : styles.nasiDoi}>
        {nasiFields.map((field, index) => {
          const id = `perechinasi[${index}].aucopii`;
          const idCasatorit = `perechinasi[${index}].casatoriti`;
          return (
            <div className={styles.perecheNasi} key={field.id}>
              <div className={styles.inp}>
                <input
                  placeholder="&nbsp;"
                  type="text"
                  {...register(`perechinasi[${index}].nas`)}
                  className=""
                  id="nas"
                />
                <label className={styles.label} htmlFor="nas">
                  Nasul
                </label>
                <span className={styles.focusBg}></span>
              </div>
              <div className={styles.inp}>
                <input
                  placeholder="&nbsp;"
                  type="text"
                  {...register(`perechinasi[${index}].nasa`)}
                  className=""
                  id="nasa"
                />
                <label className={styles.label} htmlFor="nasa">
                  Nasa
                </label>
                <span className={styles.focusBg}></span>
              </div>
              <div className={styles.auCopii}>
                <label htmlFor="nasiCopii">Sunt Casatoriti ?</label>
                <input
                  type="checkbox"
                  value="on"
                  id={idCasatorit}
                  {...register(idCasatorit)}
                />
              </div>
              <div className={styles.copiiNasiBorder}>
                <div className={styles.auCopii}>
                  <label htmlFor="nasiCopii">Au copii ? </label>
                  <input type="checkbox" value="on" id={id} {...register(id)} />
                </div>

                <ConditionalInput
                  register={register}
                  {...{ control, index, field }}
                />

                <button
                  className={styles.closeBtn}
                  type="button"
                  onClick={() => removeNasi(index)}
                >
                  <span>X</span>
                </button>
              </div>
            </div>
          );
        })}
        <button className={styles.butonAdauga} onClick={handleAdaugaNasi}>
          Adauga nasi
        </button>
      </div>
    </div>
  );
};

export default Nasi;
