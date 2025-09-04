import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocationSearchPanel = ({ vehiclePanel, setVehiclePanel  ,query  , setPickup , setDestination , toggle}) => {
  const [locations, setLocations] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
  if (!query || query.trim() === '') return;

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VERCEL_BASE_URL}/maps/get-suggestions`, {
        params: { address: query.trim() },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setLocations(response.data);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  fetchSuggestions();
}, [query]);

  const ClickHandler = (location) => {
    if(toggle=='pickup'){
      setPickup(location);
    }
    else{
      setDestination(location)
    }

  };

  return (
    <div>
      {locations.map((ele, index) => (
        <div
          key={index}
          onClick={() => ClickHandler(ele)}
          className="w-full flex items-center gap-4 my-2 text-black border-2 border-transparent rounded-xl hover:border-black active:border-black cursor-pointer"
        >
          <h2 className="rounded-full bg-gray-400 h-10 w-10 flex justify-center items-center m-1">
            <i className="px-2 text-2xl ri-map-pin-line"></i>
          </h2>
          <h4 className="px-3">{ele}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
