import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import{CaptainDataContext} from '../../context/CaptainContext.jsx'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext.jsx';
import { useEffect } from 'react';
import { getLocation } from '../../Methods/utils.js';
import axios from 'axios';
const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData , setCaptainData] = useState({});
  const {captain , setCaptain , loginCaptain} = React.useContext(CaptainDataContext);
  const [location , setLocation] = useState({latitude : 0 , longitude : 0});
  const {socket} = useContext(SocketContext);
  const navigate = useNavigate();
  useEffect(()=>{
        const func = async()=>{
          try {
            const obj = await getLocation();
            setLocation(obj);
          } catch (error) {
              throw error;
          }
        }
        func();
        const intervalref = setInterval(func , 10000);
        return ()=>{
          clearInterval(intervalref)
        }
      } ,[] )
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, {
        email,
        password ,
        socketId:socket.id 

    })
    if(response.status === 200) {
        const data = response.data;
        setCaptain(data?.captain);
        loginCaptain(data?.captain);
        console.log(data?.captain);
        localStorage.setItem('token', data?.token);
        navigate('/captain-home');
    }
    
      setEmail('');
      setPassword('');
  }   
  return (
     <div className='flex-col flex justify-between h-screen w-screen'>
        <div >
             <Link to='/'><img src="bg.png"   className='w-16 mb-10 mt-5 ml-5'/></Link>
        <form className='p-7 w-screen' onSubmit={(e)=>{
            handleSubmit(e)
        }}>
            <h3 className='text-lg mb-2 font-semibold'>What's your email ?</h3>
            <input
            type="email" 
            placeholder="Enter your Email"  
            value={email}
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            className="border bg-[#eeeeee] mb-7 rounded px-4 py-2 m-2 w-full text-lg placeholder:text-gray-500 border"  
            required
            />
            <h3 className='text-lg mb-2 font-semibold'>Enter your Password</h3>
            <input 
            className="border bg-[#eeeeee] mb-7 rounded px-4 py-2 m-2 w-full text-lg placeholder:text-gray-500 border"
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder='password'
            />
            <button
            className="border bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 m-2 w-full text-lg placeholder:text-gray-500"
            >Login</button>
        </form>
            <p className='mx-7 px-2'>Register as Captain? <Link to='/captain-signup' className='text-blue-600'>Create new Account</Link></p>
        </div>
        <div className=' p-7'>
            <Link to='/login'
            className='  text-white font-semibold flex items-center justify-center mb-5 rounded px-4 py-2 m-2 w-full text-lg placeholder:text-gray-500 bg-[#d5622d] '>
                Sign in as User
            </Link>
        </div>
    </div>
  )
}

export default CaptainLogin
