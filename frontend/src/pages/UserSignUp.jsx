import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import axios from 'axios';
import {UserDataContext} from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';
const UserSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { userData , setUserData } = useContext(UserDataContext);
    const {socket} = useContext(SocketContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
          fullName:{
            firstName: firstName,
            lastName: lastName 
          },
          email: email,
          password: password , 
          socketId:socket.id
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
        if(response.status === 201) {
            const data = response.data;
            setUserData(data?.user);
            localStorage.setItem('token', data?.token);
            navigate('/home');
        }
        setFirstName('')
        setLastName('')
        setPassword('');
        setEmail('');
    }
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
            <button
            className="border bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 m-2 w-full text-lg font-medium placeholder:text-gray-500"
            >Signup</button>
        </form>
            <p className='mx-7 px-2'>Already Registered? <Link to='/login' className='text-blue-600'>Login</Link></p>
        </div>
        <div className='p-3 text-sm font-semibold'>
            <p>By proceeding , you consent to get calls , Whatsapp or SMS messages , including by automated means from Uber and its affiliates to the number provided</p>
        </div>
    </div>
  )
}

export default UserSignUp
