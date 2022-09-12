/*global google*/
import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, MarkerF, DirectionsRenderer } from "@react-google-maps/api";

import { FaLocationArrow } from "react-icons/fa";

import styles from "./maps.module.scss";

const center = {
  lat: 46.56444,
  lng: 26.91409,
};

function Directii({ destinatie }) {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [originPoint] = useState({ lat: 46.56444, lng: 26.91409 });

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  async function calculateRoute({ destinatie }) {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: await originPoint,
      destination: await destinatie,

      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }
  useEffect(() => {
    calculateRoute({ destinatie });
  }, [destinatie]);

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <>
      <div className={styles.mapContainer}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <MarkerF position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>

      <div>
        <p>Distanta: {distance} </p>
        <p>Durata: {duration} </p>
        <button
          aria-label="center back"
          onClick={() => {
            map.panTo(center);
            map.setZoom(15);
          }}
        >
          Locatie Plecare <FaLocationArrow />
        </button>
      </div>
    </>
  );
}

export default React.memo(Directii);
