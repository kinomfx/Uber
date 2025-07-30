import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CaptainDetails from '../../Components/CaptainDetails'
import RidePopUp from '../../Components/RidePopUp'
import {useGSAP} from '@gsap/react'
import ConfirmRide from '../../Components/ConfirmRide.jsx'
import gsap from 'gsap'; 
const CaptainHome = () => {
  const navigate = useNavigate()
  const [ridePopUpPanel , setRidePopUpPanel] = useState(true);
  const [confirmRidePanel , setConfirmRidePanel] = useState(false);
  const ridePopUpRef = useRef(null);
  const confirmRideRef = useRef(null);
  useGSAP(function(){
    if(ridePopUpPanel == true){
      gsap.to(ridePopUpRef.current , {
        transform:'translateY(0)' ,
      })
    }
    else{
      gsap.to(ridePopUpRef.current ,{
        transform:'translateY(100%)'
      })
    }
  } , [ridePopUpPanel])

  useGSAP(function(){
    if(confirmRidePanel == true){
      gsap.to(confirmRideRef.current , {
        transform:'translateY(0)' ,
      })
    }
    else{
      gsap.to(confirmRideRef.current ,{
        transform:'translateY(100%)'
      })
    }
  } , [confirmRidePanel])
  return (
    <div className='h-screen w-screen'>
        <div className='fixed top-0 p-3 w-full flex items-center justify-between'>
          <img src="/bg.png" className='w-16 absolute mt-6 ' onClick={()=>{
            navigate('/')
          }}/>
          <Link className=' text-2xl right-2 top-2 block fixed h-10 w-10 bg-white flex items-center justify-center rounded-full' to='/home'>
           <i className="ri-logout-box-r-line"></i>
        </Link>
        </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'></img>
      </div>
      <div className='h-2/5 p-6'>
          <CaptainDetails/>
      </div>
      <div  ref={ridePopUpRef} className={`fixed z-10 bottom-0 justify-between items-center p-3 text-black bg-white w-full `}>  
          <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePanel={setConfirmRidePanel}/>
      </div>
      <div  ref={confirmRideRef} className={`fixed z-10 h-screen bottom-0 justify-between items-center p-3 text-black bg-white w-full `}>  
          <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setRidePopUpPanel={setRidePopUpPanel}/>
      </div>
    </div>
  )
}

export default CaptainHome
