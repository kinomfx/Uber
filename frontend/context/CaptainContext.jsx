import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
export const CaptainDataContext = createContext();

// Provider component
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(() => {
    // Initialize state from localStorage if available
    const savedCaptain = localStorage.getItem('captain');
    return savedCaptain && savedCaptain !== "undefined"
      ? JSON.parse(savedCaptain)
      : null;
  });

  const loginCaptain = (captainData) => {
    setCaptain(captainData);
    localStorage.setItem('captain', JSON.stringify(captainData));
  };

  const logoutCaptain = () => {
    console.log('logout');
    setCaptain(null);
    localStorage.removeItem('captain');
  };
  const updateCaptain = (captainData) => {
    if (captainData) {
      setCaptain(captainData);
      localStorage.setItem('captain', JSON.stringify(captainData));
    } else {
      // If no valid captain, clear it
      setCaptain(null);
      localStorage.removeItem('captain');
    }
  };

  // Optional: Save to localStorage whenever captain changes
  useEffect(() => {
    if (captain) {
      localStorage.setItem('captain', JSON.stringify(captain));
    }
  }, [captain]);

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain, loginCaptain, logoutCaptain , updateCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;