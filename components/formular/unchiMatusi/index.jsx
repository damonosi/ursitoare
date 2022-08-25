import { useRef, useState } from "react";
import styles from "./Unchi.module.scss";
import { useFieldArray } from "react-hook-form";
import { CasatoritInput } from "./CasatoritInput";

const UnchiMatusi = ({ register, control }) => {
  const [stil1, setStil2] = useState(false);

  const handleAdaugaUnchiMatusi = () => {
    unchiAppend();
    setStil2(true);
  };
  const {
    fields: unchiFields,
    append: unchiAppend,
    remove: removeUnchi,
  } = useFieldArray({
    control,
    name: "unchiMatusi",
  });

  return (
    <div className={styles.dateUnchi}>
      <span>Unchi/Matusa</span>
      <div className={stil1 ? styles.nasi : styles.nasiDoi}>
        {unchiFields.map((field, index) => {
          const id = `unchiMatusi[${index}].casatorit`;

          return (
            <div className={styles.perecheNasi} key={field.id}>
              <div className={styles.inp}>
                <input
                  placeholder="&nbsp;"
                  type="text"
                  {...register(`unchiMatusi[${index}].nume`)}
                  className=""
                  id="nume"
                />
                <label className={styles.label} htmlFor="nume">
                  Nume
                </label>
                <span className={styles.focusBg}></span>
              </div>

              <div className={styles.copiiNasiBorder}>
                <div className={styles.auCopii}>
                  <label htmlFor="unchiCasatorit">Este casatorit? </label>
                  <input type="checkbox" value="on" id={id} {...register(id)} />
                </div>

                <CasatoritInput
                  register={register}
                  {...{ control, index, field }}
                />

                <button
                  className={styles.closeBtn}
                  type="button"
                  onClick={() => removeUnchi(index)}
                >
                  <span>X</span>
                </button>
              </div>
            </div>
          );
        })}
        <button
          className={styles.butonAdauga}
          onClick={handleAdaugaUnchiMatusi}
        >
          Adauga unchi/matusa
        </button>
      </div>
    </div>
  );
};

export default UnchiMatusi;
