import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { SocketContext } from '../context/SocketContext'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext.jsx';
const ConfirmedRide = ({setConfirmRidePanel , setVehicleFound , pickup , destination , fare , setVehiclePanel , createRide , vehicleToggle , setOTP}) => {
  const {socket} = useContext(SocketContext);
  const {userData} = useContext(UserDataContext);
  return (
    <div className='flex flex-col items-center justify-center w-full'>
    <div className=' flex w-full justify-between'>
      <h3 className='text-2xl font-semibold mb-5'>Confirming Your Ride </h3>
      <i className="ri-arrow-down-s-line text-3xl" height="32" width="32" onClick={()=>{
                setConfirmRidePanel(false)
      }}></i>
      
    </div>
   <div className=' flex flex-col gap-5 justify-center items-center w-full'>  
      <img  className='h-20 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="" />
      <div className='w-full mt-5'>
        <div className='flex  gap-5  p-3 border-b-2'>
          <i className="ri-map-pin-line text-2xl "></i>
          <div>
            <h3 className='text-lg font-medium'>  
            {pickup.split(' ').slice(0 , 2).join(' ')}
            </h3>
            <p className='text-sm text-gray-600'>{pickup.split(' ').slice(2).join(' ')}</p>
          </div>
        </div>
        <div className='flex  gap-5  p-3 border-b-2'>
          <i className="ri-map-pin-range-fill text-2xl"></i>
          <div>
            <h3 className='text-lg font-medium'> 
              {destination.split(' ').slice(0 , 2).join(' ')}
            </h3>
            <p className='text-sm text-gray-600'>{destination.split(' ').slice( 2).join(' ')}</p>
          </div>
        </div>
        <div className='flex  gap-5 p-3'>
          <i className="ri-cash-line text-2xl"></i>
          <div>
            <h3 className='text-lg font-medium'> 
             {fare}₹
            </h3>
            <p className='text-sm text-gray-600'></p>
          </div>
        </div>
      </div>
      <button onClick={async()=>{
        const res = await createRide();
        setVehicleFound(true)
        setConfirmRidePanel(false)
        setVehiclePanel(false)
        console.log("this is the res : " , res)
        const pickup = res.data.ride.pickup 
        const destination = res.data.ride.destination
        const fare = res.data.ride.fare
        const socketId = socket.id;
        const userId = res.data.ride.user;
        const userName = userData.fullName.firstName + " " + userData.fullName.lastName;
        const vehicle = vehicleToggle;
        setOTP(res.data.ride.OTP)
        const otp = res.data.ride.OTP
        console.log('vehicle : ' , vehicle);
        console.log(userName);
        if(socket){
          socket.emit('new_ride_available' , {pickup , destination , fare ,socketId , userId ,userName ,vehicleToggle , otp});
        }
        }} className=' mt-5 w-full border-2 black rounded-lg p-2 bg-green-600 text-white font-semibol'>Confirm Ride</button>
      </div>
    </div>
  )
}

export default ConfirmedRide
