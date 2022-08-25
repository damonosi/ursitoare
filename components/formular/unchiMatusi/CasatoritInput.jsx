import { useFieldArray, Controller, useWatch } from "react-hook-form";
import styles from "./Unchi.module.scss";

export const CopiiUnchiInput = ({ index, control, register }) => {
  const {
    fields: copiiUnchiFields,
    remove,
    append: copiiUnchiAppend,
  } = useFieldArray({
    control,
    name: `unchiMatusi[${index}].copii`,
  });

  return (
    <div className={styles.copiiNasiContainer}>
      <span className={styles.copiiNasiTitlu}> Copii </span>
      {copiiUnchiFields.map((copil, k) => {
        return (
          <div className={styles.copiiUnchi} key={copil.id}>
            <p>{k + 1}</p>
            <div className={styles.inp}>
              <input
                placeholder="&nbsp;"
                name={`unchiMatusi[${index}].copii[${k}]`}
                {...register(`unchiMatusi[${index}].copii[${k}].nume`)}
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
                name={`unchiMatusi[${index}].copii[${k}]`}
                {...register(`unchiMatusi[${index}].copii[${k}].varsta`)}
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
        className={styles.butonAdauga}
        type="button"
        onClick={() => copiiUnchiAppend()}
      >
        <span> + </span>
      </button>
    </div>
  );
};

export const CasatoritInput = ({ control, index, register }) => {
  const value = useWatch({
    name: "unchiMatusi",
    control,
  });

  return (
    <div className={styles.auCopiiContainer}>
      <Controller
        control={control}
        name={`unchiMatusi[${index}].casatorit`}
        render={() =>
          value[index].casatorit === "on" ? (
            <div className={styles.randFormular}>
              <div key={index}>
                <div className={styles.inp}>
                  <input
                    placeholder="&nbsp;"
                    type="text"
                    {...register(`unchiMatusi[${index}].numeSotieSot`)}
                  />
                  <label className={styles.label} htmlFor="varstaCp">
                    Numele sotiei/sotului
                  </label>
                  <span className={styles.focusBg}></span>
                </div>
                <CopiiUnchiInput {...{ control, index, register }} />
              </div>
            </div>
          ) : null
        }
      />
    </div>
  );
};
