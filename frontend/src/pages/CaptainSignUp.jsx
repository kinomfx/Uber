import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { CaptainDataContext } from "../../context/CaptainContext.jsx";
import { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext.jsx';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const CaptainSignUp = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const socket = useContext(SocketContext);
  const {captain , setCaptain , loginCaptain} = React.useContext(CaptainDataContext);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const captainData = {
      fullName: {
        firstName,
        lastName
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType 
      } , 
      socketId:socket.id
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    console.log(response.status);
    if(response.status === 201) {
      setCaptain(response.data.captain);
      localStorage.setItem('token', response.data.token);
      loginCaptain(response.data.captain)
      navigate('/captain-home');
    }
    // clear fields if needed
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');


  };
  return (
   <div className='flex-col flex justify-between h-screen w-screen'>
        <div >
            <Link to='/'><img src="bg.png"   className='w-16 mb-10 mt-5 ml-5'/></Link>
        <form className='p-7 w-screen' onSubmit={(e)=>{
            handleSubmit(e)
        }}>
            <h3 className='text-lg mb-2 font-semibold'>What's your name ?</h3>
            <div className='flex mb-5 '>
              <input
              type="text" 
              placeholder="First Name"  
              name='Firstname'
              className="border bg-[#eeeeee]  rounded px-4 py-2 m-2 w-1/2 font-medium  text-base placeholder:text-gray-500 border"  
              required
              value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
              type="text" 
              placeholder="Last Name"  
              name='Lastname'
              className="border bg-[#eeeeee] rounded px-4 py-2 m-2 w-1/2 text-base font-medium placeholder:text-gray-500 border"  
              required
              value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <h3 className='text-lg mb-2 font-semibold'>What's your email ?</h3>
            <input
            type="email" 
            placeholder="Enter your Email"  
            name='email'
            className="border bg-[#eeeeee] mb-5 rounded px-4 py-2 m-2 w-full text-base font-medium placeholder:text-gray-500 border"  
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <h3 className='text-lg mb-2 font-semibold'>Enter your Password</h3>
            <input 
            className="border bg-[#eeeeee] mb-5 rounded px-4 py-2 m-2 w-full text-base font-medium placeholder:text-gray-500 border"
            type="password" 
            required 
            name="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <h3 className='text-lg mb-2 font-semibold'>Vehicle Information</h3>
            <div className='flex w-full'>
            <input
              type="text"
              className="border bg-[#eeeeee] mb-5 rounded px-4 py-2 m-2 w-1/2 text-base font-medium placeholder:text-gray-500 border"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={e => setVehicleColor(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Vehicle Plate"
              className="border bg-[#eeeeee] mb-5 rounded px-4 py-2 m-2 w-1/2 text-base font-medium placeholder:text-gray-500 border"
              value={vehiclePlate}
              onChange={e => setVehiclePlate(e.target.value)}
              required
            />
            </div>
            <div className='flex w-full'>
               <input
              type="number"
              placeholder="Vehicle Capacity"
              className="border bg-[#eeeeee] mb-5 rounded px-4 py-2 m-2 w-full text-base font-medium placeholder:text-gray-500 border"
              value={vehicleCapacity}
              onChange={e => setVehicleCapacity(e.target.value)}
              required
              min={1}
              max={10}
            />
            <select
              value={vehicleType}
              onChange={e => setVehicleType(e.target.value)}
              required
              className="border bg-[#eeeeee] mb-5 rounded px-4 py-2 m-2 w-full text-base font-medium placeholder:text-gray-500 border"
  
            >
              <option value="" disabled>Select Your Vehicle</option>
              <option value="bike">Bike</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
            </select>
            </div>
            <button
            className="border bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 m-2 w-full text-lg font-medium placeholder:text-gray-500"
            >Signup</button>
        </form>
            <p className='mx-7 px-2'>Already Registered? <Link to='/captain-login' className='text-blue-600'>Login</Link></p>
        </div>
        <div className='p-3 text-sm font-semibold'>
            <p>By proceeding , you consent to get calls , Whatsapp or SMS messages , including by automated means from Uber and its affiliates to the number provided</p>
        </div>
    </div>
  )
}

export default CaptainSignUp
