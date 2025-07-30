import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState , useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRide from '../../Components/FinishRide.jsx';
const CaptainRiding = () => {
    const navigate = useNavigate();
    const [finishRidePanel , setFinishRidePanel] = useState(false);
    const finishRideRef = useRef(null);
    useGSAP(function(){
    if(finishRidePanel == true){
      gsap.to(finishRideRef.current , {
        transform:'translateY(0)' ,
      })
    }
    else{
      gsap.to(finishRideRef.current ,{
        transform:'translateY(100%)'
      })
    }
  } , [finishRidePanel])
    return (
      <div className='h-screen w-screen '>
        <div className='fixed top-0 p-3 w-full flex items-center justify-between'>
          <img src="/bg.png" className='w-16 absolute mt-6 ' onClick={()=>{
            navigate('/')
          }}/>
          <Link className=' text-2xl right-2 top-2 block fixed h-10 w-10 bg-white flex items-center justify-center rounded-full' to='/captain-home'>
           <i className="ri-logout-box-r-line"></i>
        </Link>
        </div>
      <div className='h-4/5'>
        <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'></img>
      </div>
      <div className='h-full p-2 bg-yellow-400 flex flex-col items-center  relative ' onClick={()=>setFinishRidePanel(true)}>
      <i className="ri-arrow-up-wide-line text-3xl mb-5 -mt-2"  ></i>
          <div className='ml-5 w-full flex items-center justify-evenly'>
            <h4 className='text-xl font-semibold'>4Km away </h4>
          <button className='mx-2  rounded-lg p-2 flex justify-center bg-green-600 text-white font-semibold px-10'>Complete Ride</button>
          </div>
      </div>
      <div  ref={finishRideRef} className={`fixed z-10 h-4/5 bottom-0 justify-between items-center p-3 text-black bg-white w-full `}>  
          <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
   
  )
}

export default CaptainRiding
