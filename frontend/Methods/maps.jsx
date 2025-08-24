import React from 'react'
import { GoogleMap, useJsApiLoader  , Marker} from '@react-google-maps/api'
function Maps({center}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    libraries: ['places'],
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API ,
  })

  const [map, setMap] = React.useState(null)
  const [directionsResponse, setDirectionsResponse] = React.useState(null)
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    const listener = window.google.maps.event.addListenerOnce(map, "bounds_changed", () => {
    if (map.getZoom() > 16) map.setZoom(16)   // cap zoom
    })
    setMap(map)
  }, [center])  // depend on center

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "375px", height: "490px" }}
      center={center}
      zoom={16}
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
        isableDefaultUI: true
      }}
    >
        <Marker position={center} />
      {/* Markers, routes, etc. */}
    </GoogleMap>
  ) : null
}

export default Maps;
