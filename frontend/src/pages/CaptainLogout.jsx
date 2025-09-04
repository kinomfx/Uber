import React from 'react'
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { CaptainDataContext } from '../../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
const CaptainLogout = () => {
  const { setCaptain , logoutCaptain} = useContext(CaptainDataContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VERCEL_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('token');
          setCaptain(null);
          navigate('/login');
          logoutCaptain()
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
}

export default CaptainLogout
