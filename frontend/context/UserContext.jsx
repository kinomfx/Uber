// ../context/UserContext.jsx

import { createContext, useState } from "react";

export const UserDataContext = createContext();

// Rename the component to UserProvider
const UserProvider = ({children}) => {
  const [userData, setUserData] = useState({
    fullName:{
      firstName: '',
      lastName: ''
    },
    email: ''
  });

  return (
    <UserDataContext.Provider value={{userData , setUserData}}>
      {children}
    </UserDataContext.Provider>
  );
};

// Update the default export
export default UserProvider;