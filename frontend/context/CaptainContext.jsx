import React, { createContext, useContext, useState } from "react";

// Create the context
export const CaptainDataContext = createContext();

// Custom hook for easy access

// Provider component
const  CaptainContext= ({ children }) => {
  const [captain, setCaptain] = useState(null);

  const loginCaptain = (captainData) => setCaptain(captainData);
  const logoutCaptain = () => setCaptain(null);

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain ,  loginCaptain, logoutCaptain }}>
      {children}
    </CaptainDataContext.Provider>
    );
};

export default CaptainContext;