import React, { createContext, useState, useEffect } from "react";

// Create the context
export const CaptainDataContext = createContext();

// Provider component
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(() => {
    const savedCaptain = localStorage.getItem("captain");
    return savedCaptain && savedCaptain !== "undefined"
      ? JSON.parse(savedCaptain)
      : null;
  });

  // 👇 New state for live location
  const [captainLocation, setCaptainLocation] = useState(null);

  const loginCaptain = (captainData) => {
    setCaptain(captainData);
    localStorage.setItem("captain", JSON.stringify(captainData));
  };

  const logoutCaptain = () => {
    setCaptain(null);
    localStorage.removeItem("captain");
  };

  const updateCaptain = (captainData) => {
    if (captainData) {
      setCaptain(captainData);
      localStorage.setItem("captain", JSON.stringify(captainData));
    } else {
      setCaptain(null);
      localStorage.removeItem("captain");
    }
  };

  useEffect(() => {
    if (captain) {
      localStorage.setItem("captain", JSON.stringify(captain));
    }
  }, [captain]);

  return (
    <CaptainDataContext.Provider
      value={{
        captain,
        setCaptain,
        loginCaptain,
        logoutCaptain,
        updateCaptain,
        captainLocation,   // 👈 expose location
        setCaptainLocation // 👈 expose setter
      }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
