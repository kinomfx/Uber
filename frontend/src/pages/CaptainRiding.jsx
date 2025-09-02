import React, { useState, useRef, useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRide from '../../Components/FinishRide.jsx';
import Maps from '../../Methods/maps.jsx';
import CaptainContext from '../../context/CaptainContext.jsx';
import { SocketContext } from '../../context/SocketContext.jsx';
const CaptainRiding = () => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext)
  const location = useLocation();   // ✅ useLocation hook
  const { rideData } = location.state || {}; // ✅ unfold rideData safely
  console.log(rideData);
  const [currentLocation , setCurrentLocation] = useState(null);
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRideRef = useRef(null);
  const captainContext = useContext(CaptainContext);

  // ✅ Extract ride data fields
  const pickup = rideData?.pickup || '';
  const destination = rideData?.destination || '';
  const fare = rideData?.fare || '';
  const socketId = rideData?.socketId || '';
  console.log(socketId);
  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRideRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(finishRideRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel]);

  // ✅ continuously update captain location
  useEffect(() => {
    function fetchLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        }, (error) => {
          console.error("Error fetching location:", error);
        }, { enableHighAccuracy: true });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }   
    }
    fetchLocation();
    const intervalId = setInterval(fetchLocation, 5000);
    return () => clearInterval(intervalId); // cleanup
  },[])

  return (
    <div className='h-screen w-screen'>
      <div className='fixed top-0 p-3 w-full flex items-center justify-between'>
        <img src="/bg.png" className='w-16 absolute mt-6 ' onClick={() => {
          navigate('/')
        }} />
        <Link className='text-2xl right-2 top-2 block fixed h-10 w-10 bg-white flex items-center justify-center rounded-full' to='/captain-home'>
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-4/5'>
        {/* ✅ Show map from captain's live location to destination */}
        {currentLocation && (
        <Maps
          height="532px"
          pickup={currentLocation}   // 🚖 live location updates
          destination={destination}
          zoom={50}
        />
      )}

      </div>

      <div className='h-full p-2 bg-yellow-400 flex flex-col items-center relative' onClick={() => setFinishRidePanel(true)}>
        <i className="ri-arrow-up-wide-line text-3xl mb-5 -mt-2"></i>
        <div className='ml-5 w-full flex items-center justify-evenly'>
          <button className='mx-2 rounded-lg p-2 flex justify-center bg-green-600 text-white font-semibold px-10'>
            Complete Ride
          </button>
        </div>
      </div>

      <div ref={finishRideRef} className={`fixed z-10 h-4/5 bottom-0 justify-between items-center p-3 text-black bg-white w-full`}>
        <FinishRide setFinishRidePanel={setFinishRidePanel} pickup={pickup} destination={destination} fare={fare} socketId={socketId}/>
      </div>
    </div>
  )
}

export default CaptainRiding
