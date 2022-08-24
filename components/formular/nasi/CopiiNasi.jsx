import { useFieldArray, Controller, useWatch } from "react-hook-form";
import styles from "./Nasi.module.scss";

export const CopiiNasiInput = ({ index, control, register }) => {
  const {
    fields: copiiFields,
    remove,
    append: copiiAppend,
  } = useFieldArray({
    control,
    name: `perechinasi[${index}].copii`,
  });

  return (
    <div>
      {copiiFields.map((copil, k) => {
        return (
          <div className={styles.copiiNasi} key={copil.id}>
            <p>{k + 1}</p>
            <div className={styles.inp}>
              <input
                placeholder="&nbsp;"
                name={`perechinasi[${index}].copii[${k}]`}
                {...register(`perechinasi[${index}].copii[${k}].nume`)}
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
                name={`perechinasi[${index}].copii[${k}]`}
                {...register(`perechinasi[${index}].copii[${k}].varsta`)}
              />
              <label className={styles.label} htmlFor="varstaCp">
                Varsta
              </label>
              <span className={styles.focusBg}></span>
            </div>

            <button
              className={styles.closeBtn}
              type="button"
              onClick={() => remove(index)}
            >
              <span> X</span>
            </button>
          </div>
        );
      })}
      <button
        // className={styles.butonAdauga}
        type="button"
        onClick={() => copiiAppend()}
      >
        <span> Adauga Copil</span>
      </button>
    </div>
  );
};

export const ConditionalInput = ({ control, index, register }) => {
  const value = useWatch({
    name: "perechinasi",
    control,
  });

  return (
    <>
      <Controller
        control={control}
        name={`perechinasi[${index}].aucopii`}
        render={() =>
          value[index].aucopii === "on" ? (
            <div className={styles.randFormular}>
              <div key={index}>
                <CopiiNasiInput {...{ control, index, register }} />
              </div>
            </div>
          ) : null
        }
      />
    </>
  );
};
