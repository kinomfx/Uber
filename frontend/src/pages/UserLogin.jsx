import React, { use } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserDataContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const UserLogin = () => {
    const username = useContext(UserDataContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userData, setUserData } = useContext(UserDataContext);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const User = {
            email: email,
            password: password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, User)
        if(response.status === 200) {
            const data = response.data;
            setUserData(data?.user);
            localStorage.setItem('token' , data?.token);
            navigate('/home');
        }
        else{
            console.log("Login failed");
            alert("Login failed, please try again");
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
            <p className='mx-7 px-2'>New here ? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
        </div>
        <div className=' p-7'>
            <Link to='/captain-login'
            className='  text-white font-semibold flex items-center justify-center mb-5 rounded px-4 py-2 m-2 w-full text-lg placeholder:text-gray-500 bg-[#10b461] '>
                Sign in as Captain
            </Link>
        </div>
    </div>
  )
}

export default UserLogin
