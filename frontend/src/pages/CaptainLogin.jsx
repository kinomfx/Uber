import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData , setCaptainData] = useState({});
  const handleSubmit = (e) => {
      e.preventDefault();
      setCaptainData({
          email: email,
          password: password
      });
      console.log(captainData)
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
