import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { UserDataContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setUserData } = useContext(UserDataContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('token');
          setUserData({});
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error("Logout failed", error);
        // Optional: navigate to login anyway
        navigate('/login');
      });
  }, []);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default Logout;
