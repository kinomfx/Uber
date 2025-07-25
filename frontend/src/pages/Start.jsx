import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className=' bg-[url(https://plus.unsplash.com/premium_photo-1669366206339-f94346ea35c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhZmZpYyUyMGxpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D)] bg-cover - h-screen w-full   flex flex-col justify-between'>
            <img src="bg.png"   className='w-16 mb-10 mt-5 ml-5'/>
            <div className='bg-white pb-7 px-4 py-4 w-screen'>
                <h2 className='text-2xl font-bold '>Get Started with Uber</h2>
                <Link to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start
