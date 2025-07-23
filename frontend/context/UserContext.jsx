import { createContext } from "react";
import React from 'react'
export const UserDataContext = createContext();

const UserContext = ({children}) => {
  const userData ={
    fullName:{
      firstName: '',
      lastName: ''
    },
    email: '',
    password: ''
  }
  return (
    <div>
      <UserDataContext.Provider value={{userData}}>
        {children}
      </UserDataContext.Provider>
  </div>
  )
}
export default UserContext;

