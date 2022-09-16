import React, { useState, useRef, useEffect } from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
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
  const latitudine = watch("locatieeveniment.lat");
  const longitudine = watch("locatieeveniment.lng");
  const nume = watch("locatieeveniment.nume");

  const handleSelect =
    ({ description }) =>
    () => {
      adaugaValoare(description, false);
      setValue("locatieeveniment.nume", description);
      clearSuggestions();

      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setValue("locatieeveniment.lat", lat);
          setValue("locatieeveniment.lng", lng);
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
        });
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
        {...register("locatieeveniment.nume", {
          required: "Va rugam sa ne spuneti unde are loc petrecerea",
        })}
        value={valoare || ""}
        type="text"
        onChange={handleInput}
        disabled={!ready}
        name="locatieeveniment.nume"
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
      <div className={styles.latLngContainer}>
        <input
          {...register("locatieeveniment.lat", {
            required: "Va rugam sa ne spuneti unde are loc petrecerea",
          })}
          value={latitudine || ""}
          type="text"
          onChange={handleInput}
          disabled={!ready}
          name="locatieeveniment.lat"
        />
        <input
          {...register("locatieeveniment.lng", {
            required: "Va rugam sa ne spuneti unde are loc petrecerea",
          })}
          value={longitudine || ""}
          type="text"
          onChange={handleInput}
          disabled={!ready}
          name="locatieeveniment.lng"
        />
      </div>
    </div>
  );
}

export default React.memo(MapaRezervare);
