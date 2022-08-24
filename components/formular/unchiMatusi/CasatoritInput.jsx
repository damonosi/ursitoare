import { useFieldArray, Controller, useWatch } from "react-hook-form";
import styles from "./Unchi.module.scss";
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
              <div key={index}></div>
            </div>
          ) : null
        }
      />
    </div>
  );
};
