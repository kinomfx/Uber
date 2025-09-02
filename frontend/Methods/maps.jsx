import React, { useEffect, useCallback, useState } from "react";
import { getLocation } from "../Methods/utils.js";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";

const libraries = ["places"];
function Maps({ pickup, destination , width = "375px", height = "490px" }) {
    const [center , setCenter]  = useState({ lat: 37.7749, lng: -122.4194 }); // Default center (San Francisco)
    useEffect(() => {
        const func = async () => {
          try {
            const obj = await getLocation()
            setCenter({lat:obj.latitude , lng:obj.longitude});
          } catch (error) {
            throw error
          }
        }
        func()
      }, [])
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries,
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  const getDirections = async () => {
    if (!pickup || !destination) {
      setDirectionsResponse(null); 
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const results = await directionsService.route({
        origin: pickup,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      if (results.status === "OK") {
        setDirectionsResponse(results);

        // ✅ Fit map bounds to the route
        if (map) {
          const bounds = new window.google.maps.LatLngBounds();
          results.routes[0].overview_path.forEach((point) =>
            bounds.extend(point)
          );
          map.fitBounds(bounds);
        }
      } else {
        console.warn("Directions request failed:", results.status);
        setDirectionsResponse(null);
      }
    } catch (err) {
      console.error("Error fetching directions:", err);
      setDirectionsResponse(null);
    }
  };

  useEffect(() => {
    getDirections();
  }, [pickup, destination, map]);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: width, height: height }}
      center={center}
      zoom={16} // default, will get overridden by fitBounds
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        disableDefaultUI: true,
      }}
    >
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </GoogleMap>
  ) : null;
}

export default Maps;
