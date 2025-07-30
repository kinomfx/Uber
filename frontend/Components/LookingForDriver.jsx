import React from 'react'

const LookingForDriver = ({setVehicleFound}) => {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
    <div className=' flex w-full justify-between'>
      <h3 className='text-2xl font-semibold mb-5'>Looking For your Ride </h3>
      <i className="ri-arrow-down-s-line text-3xl" height="32" width="32" onClick={()=>{
                setVehicleFound(false)
      }}></i>
      
    </div>
   <div className=' flex flex-col gap-5 justify-center items-center w-full'>  
      <img  className='h-20 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="" />
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
      
      </div>
    </div>
  )
}

export default LookingForDriver
