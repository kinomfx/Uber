import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CaptainDetails from '../../Components/CaptainDetails'
import RidePopUp from '../../Components/RidePopUp'
import {useGSAP} from '@gsap/react'
import ConfirmRide from '../../Components/ConfirmRide.jsx'
import gsap from 'gsap'; 
import { useContext } from 'react'
import {CaptainDataContext} from '../../context/CaptainContext.jsx'
import { SocketContext } from '../../context/SocketContext.jsx'
import { useEffect } from 'react'
import { getLocation } from '../../../Backend/services/maps.services.js'
import axios from 'axios';
const CaptainHome = () => {
  const navigate = useNavigate()
  const [ridePopUpPanel , setRidePopUpPanel] = useState(false);
  const [confirmRidePanel , setConfirmRidePanel] = useState(false);
  const ridePopUpRef = useRef(null);
  const confirmRideRef = useRef(null);
  const {captain , updateCaptain} = useContext(CaptainDataContext);
  const socket = useContext(SocketContext);
  const [rideData ,setRideData] = useState(null);
  
  useEffect(() => {
  if (socket) {
    console.log('Socket connected:', socket.connected);
    console.log('Socket ID:', socket.id);
  }
}, [socket]);
  useEffect(() => {
      // Ensure the socket object exists before trying to use it
      if (socket) {
          
      
          const handleNewRide = (data) => {
              setRideData(data);
              setRidePopUpPanel(true);
          };

          // 2. Attach the listener with the CORRECT event name
          socket.on('new_ride', handleNewRide);

          // 3. Return a cleanup function that removes the EXACT same listener
          return () => {
              
          };
      }
  }, [socket]);
  useGSAP(function(){
    if(ridePopUpPanel == true){
      gsap.to(ridePopUpRef.current , {
        transform:'translateY(0)' ,
      })
    }
    else{
      gsap.to(ridePopUpRef.current ,{
        transform:'translateY(100%)'
      })
    }
  } , [ridePopUpPanel])

  useGSAP(function(){
    if(confirmRidePanel == true){
      gsap.to(confirmRideRef.current , {
        transform:'translateY(0)' ,
      })
    }
    else{
      gsap.to(confirmRideRef.current ,{
        transform:'translateY(100%)'
      })
    }
  } , [confirmRidePanel])
  return (
    <div className='h-screen w-screen'>
        <div className='fixed top-0 p-3 w-full flex items-center justify-between'>
          <img src="/bg.png" className='w-16 absolute mt-6 ' onClick={()=>{
            navigate('/')
          }}/>
          <Link className=' text-2xl right-2 top-2 block fixed h-10 w-10 bg-white flex items-center justify-center rounded-full' to='/captain-logout'>
           <i className="ri-logout-box-r-line"></i>
        </Link>
        </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'></img>
      </div>
      <div className='h-2/5 p-6'>
          <CaptainDetails/>
      </div>
      <div  ref={ridePopUpRef} className={`fixed z-10 bottom-0 justify-between items-center p-3 text-black bg-white w-full `}>  
          <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePanel={setConfirmRidePanel} rideData ={rideData}/>
      </div>
      <div  ref={confirmRideRef} className={`fixed z-10 h-screen bottom-0 justify-between items-center p-3 text-black bg-white w-full `}>  
          <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setRidePopUpPanel={setRidePopUpPanel} rideData = {rideData}/>
      </div>
    </div>
  )
}

export default CaptainHome
