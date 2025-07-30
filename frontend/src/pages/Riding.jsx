import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen w-screen'>
        <Link className=' text-2xl right-2 top-2 block fixed h-10 w-10 bg-white flex items-center justify-center rounded-full' to='/home'>
            <i className="ri-home-9-line"></i>
        </Link>
      <div className='h-1/2'>
        <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'></img>
      </div>
      <div className='h-1/2 p-4'>
        <div className='flex flex-col items-center justify-center w-full'>
    <div className=' flex w-full justify-between'>  
      
    </div>
        <div className='flex items-center justify-between w-full'>
            <img  className='h-12 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="" />
            <div className='text-right'>
                <h2 className='text-lg font-medium '>Unnati</h2>
                <h4 className='text-lg font-semibold -mt-1 -mb-1'>DL1470-69-281223-311206</h4>
                <p className='text-sm text-gray-600'>Maruti Ertiga</p>
            </div>
        </div>
    <div className=' flex flex-col gap-5 justify-center items-center w-full'>  
        
        <div className='w-full mt-5'>
    
            <div className='flex  gap-5  p-3 border-b-2'>
            <i className="ri-map-pin-range-fill text-2xl"></i>
            <div>
                <h3 className='text-lg font-medium'> 
                562/11A
                </h3>
                <p className='text-sm text-gray-600'>Talab Tillo , Jammu</p>
            </div>
            </div>
            <div className='flex  gap-5 p-3 '>
            <i className="ri-cash-line text-2xl"></i>
            <div>
                <h3 className='text-lg font-medium'> 
                ₹193.20
                </h3>
                <p className='text-sm text-gray-600'>Cash Cash</p>
            </div>
            </div>
        </div>
        </div>
        </div>
        <button className='mt-5 w-full border-2 black rounded-lg p-2 bg-green-600 text-white font-semibol'>Make Payment</button>
      </div>
    </div>
  )
}

export default Riding
