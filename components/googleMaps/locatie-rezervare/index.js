import React, { useState, useRef, useEffect } from "react";

import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

import styles from "./maps.module.scss";
import Spinner from "./../../spinner/Spinner";

const center = {
  lat: 46.56444,
  lng: 26.91409,
};

function MapaRezervare({ register, watch, setValue }) {
  const {
    ready,
    value: valoare,
    suggestions: { status, data },
    setValue: adaugaValoare,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: "ro",
      },
    },
    debounce: 300,
  });

  sessionStorage.removeItem("upa");
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element

    adaugaValoare(e.target.value);
  };

  const watchLocati = watch("locatieeveniment");

  const handleSelect =
    ({ description }) =>
    () => {
      adaugaValoare(description, false);
      setValue("locatieeveniment", description);
      clearSuggestions();
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div className={styles.inp} ref={ref}>
      <input
        value={valoare}
        {...register("locatieeveniment", {
          required: "Va rugam sa ne spuneti unde are loc petrecerea",
        })}
        type="text"
        onChange={handleInput}
        disabled={!ready}
        name="locatieeveniment"
      />
      <label className={styles.label} htmlFor="locatieeveniment">
        Unde are loc petrecerea
      </label>
      <span className={styles.focusBg}></span>
      <div className={styles.sustinereSugestii}>
        {status === "OK" && (
          <ul className={styles.sugestii}>{renderSuggestions()}</ul>
        )}
      </div>
    </div>
  );
}

export default React.memo(MapaRezervare);
