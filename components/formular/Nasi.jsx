import { useRef, useState } from "react";
import styles from "./Nasi.module.scss";
import { useFieldArray, Controller, useWatch } from "react-hook-form";

const ConditionalInput = ({ control, index, field, register }) => {
  const value = useWatch({
    name: "perechinasi",
    control,
  });

  return (
    <Controller
      control={control}
      name={`perechinasi[${index}].aucopii`}
      render={() =>
        value[index].aucopii === "on" ? (
          <>
            <div className={styles.inp}>
              <input
                placeholder="&nbsp;"
                {...field}
                {...register(`perechinasi[${index}].copii[0].nume`)}
                id="mumeCp"
              />
              <label className={styles.label} htmlFor="mumeCp">
                Nume
              </label>
              <span className={styles.focusBg}></span>
            </div>

            <div className={styles.inp}>
              <input
                placeholder="&nbsp;"
                id="varstaCp"
                {...field}
                {...register(`perechinasi[${index}].copii[0].varsta`)}
              />
              <label className={styles.label} htmlFor="varstaCp">
                Varsta
              </label>
              <span className={styles.focusBg}></span>
            </div>
          </>
        ) : null
      }
    />
  );
};
const Nasi = ({ register, control }) => {
  const [stil1, setStil2] = useState(false);

  const handleAdaugaNasi = () => {
    append();
    setStil2(true);
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "perechinasi",
  });

  return (
    <div className={styles.dateNasi}>
      <h1>Nasii</h1>
      <div className={stil1 ? styles.nasi : styles.nasiDoi}>
        {fields.map((field, index) => {
          const id = `perechinasi[${index}].aucopii`;
          console.log(id);
          return (
            <div className={styles.randFormular} key={field.id}>
              <div className={styles.inp}>
                <input
                  placeholder="&nbsp;"
                  type="text"
                  {...register(`perechinasi[${index}].nas`)}
                  className=""
                  id="nas"
                />
                <label className={styles.label} htmlFor="nas">
                  Nasul{" "}
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
                onClick={() => remove(index)}
              >
                <span>X</span>
              </button>
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
