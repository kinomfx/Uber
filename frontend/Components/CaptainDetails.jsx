import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src="/UNODRIVER.jpg" alt="" />
            <h4>Unnati Rayu</h4>
          </div>
          <div>
            <h5 className='text-xl font-semibold'>₹193.20</h5>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>
        </div>
        <div className='flex justify-center gap-5 items-start'>
          <div className='text-center flex justify-center gap-5 items-start p-3 bg-gray-100 rounded-xl mt-6' >
          <div>
            <i className=" text-3xl mb-2 font-thin ri-time-line"></i>
            <h5 className='text-lg font-medium'> 10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>            
          </div>

          <div className='text-center'>
            <i className=" text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'> 10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>

          <div className='text-center'>
            <i className=" text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className='text-lg font-medium'> 10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
    </div>
    </div>
  )
}

export default CaptainDetails
