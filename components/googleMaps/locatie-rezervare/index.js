import React, { useState, useRef, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

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

function MapaRezervare({ register }) {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries,
  });
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("📍 Coordinates: ", { lat, lng });
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

  if (!isLoaded) {
    return <Spinner />;
  } else {
    return (
      <div className={styles.inp} ref={ref}>
        <input
          placeholder="&nbsp;"
          {...register("locatieeveniment", {
            required: "Va rugam sa ne spuneti unde are loc petrecerea",
          })}
          value={value}
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
}

export default React.memo(MapaRezervare);
