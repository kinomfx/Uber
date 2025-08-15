import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
const ConfirmRide = ({setConfirmRidePanel , setRidePopUpPanel}) => {
  const [otp , setOTP] = useState('')
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
            <h2 className='text-xl font-medium'>Monik Shree</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 km</h5>
      </div>
   <div className=' flex flex-col gap-5 justify-center items-center w-full'>  
      <div className='w-full mt-5'>
        <div className='flex  gap-5  p-3 border-b-2'>
          <i className="ri-map-pin-line text-2xl "></i>
          <div>
            <h3 className='text-lg font-medium'> 
              562/11A
            </h3>
            <p className='text-sm text-gray-600'>Talab Tillo , Jammu</p>
          </div>
        </div>
        <div className='flex  gap-5  p-3 border-b-2'>
          <i className="ri-map-pin-range-fill text-2xl"></i>
          <div>
            <h3 className='text-lg font-medium'> 
              562/11A
            </h3>
            <p className='text-sm text-gray-600'>Talab Tillo , Jammu</p>
          </div>
        </div>
        <div className='flex  gap-5 p-3 border-b-2'>
          <i className="ri-cash-line text-2xl"></i>
          <div>
            <h3 className='text-lg font-medium'> 
             ₹193.20
            </h3>
            <p className='text-sm text-gray-600'>Cash Cash</p>
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
        <button onClick={()=>{
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
