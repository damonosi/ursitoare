import Select from "react-select";
import { Controller, useFieldArray } from "react-hook-form";

import { useState } from "react";

import styles from "./RudeStrainatate.module.scss";

const RudeStrainatate = ({ register, control, index }) => {
  const [selected, setSelected] = useState("");
  const options = [
    { value: "unchi/matusa", label: "Unchi/Matusa" },
    { value: "bunic/bunica", label: "Bunic/Bunica" },
    { value: "frate/sora", label: "Frate/Sora" },
    { value: "var/verisoara", label: "Var/Verisoara" },
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 300,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  const handleAdaugaRuda = () => {
    rudeAppend();
  };
  const {
    fields: rudeFields,
    append: rudeAppend,
    remove: rudeRemove,
  } = useFieldArray({
    control,
    name: "rudeStrainatate",
  });

  return (
    <div className={styles.strainatateContainer}>
      <h2>
        Spuneti-ne daca sunt rude care <br /> vin din strainatate
      </h2>
      <hr />
      {rudeFields.map((field, index) => {
        return (
          <div className={styles.rudeInput} key={index}>
            <div className={styles.aranjareSelect}>
              <Controller
                control={control}
                name={`rudeStrainatate[${index}].gradRudenie`}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    inputRef={ref}
                    value={options.find((c) => c.value === value)}
                    key={index}
                    onChange={(val) => {
                      onChange(val.value);
                    }}
                    options={options}
                    placeholder={<div>Rudenie</div>}
                  />
                )}
              />
              <button
                className={styles.closeBtn}
                type="button"
                onClick={() => rudeRemove(index)}
              >
                <span>X</span>
              </button>
            </div>
            <div className={styles.inp}>
              <input
                placeholder="&nbsp;"
                {...register(`rudeStrainatate[${index}].nume`)}
                type="text"
              />
              <label className={styles.label} htmlFor="nume">
                Nume
              </label>
              <span className={styles.focusBg}></span>
            </div>

            <div className={styles.inp}>
              <input
                placeholder="&nbsp;"
                type="text"
                {...register(`rudeStrainatate[${index}].tara`)}
              />
              <label className={styles.label} htmlFor="tara">
                Tara din care a venit
              </label>
              <span className={styles.focusBg}></span>
            </div>
          </div>
        );
      })}
      <button className={styles.butonAdauga} onClick={handleAdaugaRuda}>
        Adauga ruda
      </button>
    </div>
  );
};

export default RudeStrainatate;
