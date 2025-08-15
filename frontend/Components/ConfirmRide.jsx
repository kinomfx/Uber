import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useEffect } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { getAddressCoordinate } from '../../Backend/services/maps.services';
import axios from 'axios';
import { getDistanceTime } from '../../Backend/controller/map.controller';
const ConfirmRide = ({setConfirmRidePanel , setRidePopUpPanel , rideData }) => {
  const [otp , setOTP] = useState('')
  const [pickup , setPickup] = useState('')
  const [destination , setDestination] = useState('')
  const [fare , setFare] = useState('')
  const [socketId , setSocketId] = useState('')
  const [userId , setUserId] = useState('')
  const [userName , setUserName] = useState('');
  const socket = useContext(SocketContext);
  const captain = useContext(CaptainDataContext)
  const [distance , setDistance] = useState(0);
  useEffect(()=>{
    setPickup(rideData?.pickup);
    setDestination(rideData?.destination);
    setFare(rideData?.fare);
    setSocketId(rideData?.socketId)
    setUserId(rideData?.userId);
    setUserName(rideData?.userName);
  } , [rideData])


  const submitHandler = (e)=>{
  }
  return (
    <div>
      <div className=' flex w-full justify-between'>
      <h3 className='text-2xl font-semibold mb-5'>Confirm Your Ride</h3>
      <i className="ri-arrow-down-s-line text-3xl" height="32" width="32" onClick={()=>{
                setConfirmRidePanel(false);
      }}></i>
    </div>
      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-xl'>
            <div className='flex items-center gap-3 '>
            <img src="/MONIKUSER.jpg" className='h-15 w-15 rounded-full object-cover '  alt="" />
            <h2 className='text-xl font-medium'>{userName}</h2>
        </div>
        <h5 className='text-lg font-semibold'>{distance} km</h5>
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
      <form ></form>
      <div className='flex items-center justify-center w-full'>
        <form onSubmit={(e)=>{
          submitHandler(e);
        }}>
          <input type="text" placeholder='enter OTP'  className='border bg-[#eee] px-12  py-2 rounded-lg w-full mb-2 ' onChange={(e)=>{setOTP(e.target.value)}} value={otp}/>
          <Link  to='/captain-riding' onClick={()=>{
            setConfirmRidePanel(true);
            
        }} className='  w-full border-2 black rounded-lg p-2 flex justify-center bg-green-600 text-white font-semibold'>Confirm</Link>
        <button onClick={async()=>{
            const res = await createRide()
            console.log(res)
            setConfirmRidePanel(false);
            setRidePopUpPanel(false);
          
        }} className=' w-full border-2 black rounded-lg  p-2  bg-red-700 text-white font-semibold'>Cancel</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default ConfirmRide
