import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import {CaptainDataContext }from '../context/CaptainContext';
const RidePopUp = ({setRidePopUpPanel , setConfirmRidePanel , rideData , setOTP}) => {
  const [pickup , setPickup] = useState('')
  const [destination , setDestination] = useState('')
  const [fare , setFare] = useState('')
  const [socketId , setSocketId] = useState('')
  const [userId , setUserId] = useState('')
  const [userName , setUserName] = useState('');
  const {socket} = useContext(SocketContext);
  const captainData = useContext(CaptainDataContext);
  const captain = captainData?.captain
  useEffect(()=>{
    setPickup(rideData?.pickup);
    setDestination(rideData?.destination);
    setFare(rideData?.fare);
    setSocketId(rideData?.socketId)
    setUserId(rideData?.userId);
    setUserName(rideData?.userName);
    console.log(rideData)
  } , [rideData])
  return (
    <div>
        <div className=' flex w-full justify-between'>
      <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>
      <i className="ri-arrow-down-s-line text-3xl" height="32" width="32" onClick={()=>{
                setRidePopUpPanel(false);
      }}></i>
    </div>
      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-xl'>
            <div className='flex items-center gap-3 '>
            <img src="/MONIKUSER.jpg" className='h-15 w-15 rounded-full object-cover '  alt="" />
            <h2 className='text-xl font-medium'>{userName}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 km</h5>
      </div>
   <div className=' flex flex-col gap-5 justify-center items-center w-full'>  
      <div className='w-full mt-5'>
        <div className='flex  gap-5  p-3 border-b-2'>
          <i className="ri-map-pin-line text-2xl "></i>
          <div>
            <h3 className='text-lg font-medium'> 
              {pickup?.split(' ').slice(0 , 2).join(' ')}
            </h3>
            <p className='text-sm text-gray-600'>{pickup?.split(' ').slice(2).join(' ')}</p>
          </div>
        </div>
        <div className='flex  gap-5  p-3 border-b-2'>
          <i className="ri-map-pin-range-fill text-2xl"></i>
          <div>
            <h3 className='text-lg font-medium'> 
               {destination?.split(' ').slice(0 , 2).join(' ')}
            </h3>
            <p className='text-sm text-gray-600'>{destination?.split(' ').slice( 2).join(' ')}</p>
          </div>
        </div>
        <div className='flex  gap-5 p-3 '>
          <i className="ri-cash-line text-2xl"></i>
          <div>
            <h3 className='text-lg font-medium'> 
             ₹{fare?fare:''}
            </h3>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <button onClick={()=>{
            setConfirmRidePanel(true);
            setOTP(rideData?.otp)
            socket.emit('ride_accepted', {socketId , rideData  , captain})
        }} className=' mx-2 w-full border-2 black rounded-lg p-2  bg-green-600 text-white font-semibold'>Accept</button>
        <button onClick={()=>{
            setRidePopUpPanel(false);
        }} className='mx-2 w-full border-2 black rounded-lg  p-2  bg-gray-500 text-white font-semibold'>Ignore</button>
      </div>
      </div>
    </div>
  )
}

export default RidePopUp
