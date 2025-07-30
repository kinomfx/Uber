import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom';
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';  
import 'remixicon/fonts/remixicon.css'
import { set } from 'mongoose';
import VehiclePanel from '../../Components/VehiclePanel.jsx'
import LocationSearchPanel from '../../Components/LocationSearchPanel.jsx';
import ConfirmedRide from '../../Components/ConfirmedRide.jsx';
import WaitForDriver from '../../Components//WaitForDriver.jsx';
import LookingForDriver from '../../Components/LookingForDriver.jsx';
const Home = () => {

  const [pickup, setPickup] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [panel , setPanel] = React.useState(false);
  const panelRef = React.useRef(null);
  const panelCloseRef = React.useRef(null);
  const vehiclePanelCloseRef = useRef(null);
  const [vehiclePanel , setVehiclePanel] = useState(false);
  const [confirmRidePanel , setConfirmRidePanel] = useState(false);
  const [vehicleFound , setVehicleFound] = useState(false)
  const [waitingDriverPanel , setWaitingDriverPanel] = useState(false)
  const vehicleFoundRef = useRef(null)
  const vehicleref = useRef(null);
  const confirmref = useRef(null);
  const WaitingForDriverRef = useRef(null);
  const navigate = useNavigate();



  useGSAP(function(){
    if(vehiclePanel==true){
      gsap.to(vehicleref.current , {
        transform:'translateY(0)' ,
      })
    }
    else{
      gsap.to(vehicleref.current , {
        transform:'translateY(120%)' ,
      })
    }
  } ,[vehiclePanel])



  useGSAP(function(){
    if(confirmRidePanel==true){
      gsap.to(confirmref.current , {
        transform:'translateY(0)' ,
      })
    }
    else{
      gsap.to(confirmref.current , {
        transform:'translateY(120%)' ,
      })
    }
  } ,[confirmRidePanel])


  useGSAP(function(){
    if(waitingDriverPanel==true){
      gsap.to(WaitingForDriverRef.current , {
        transform:'translateY(0)' ,
      })
    }
    else{
      gsap.to(WaitingForDriverRef.current , {
        transform:'translateY(120%)' ,
      })
    }
  } ,[waitingDriverPanel])


  useGSAP(function(){
    if(vehicleFound==true){
      gsap.to(vehicleFoundRef.current , {
        transform:'translateY(0)' ,
      })
    }
    else{
      gsap.to(vehicleFoundRef.current , {
        transform:'translateY(120%)' ,
      })
    }
  } ,[vehicleFound])




  useGSAP(function(){
   if(panel=== true){
     gsap.to(panelRef.current, {
      height: '70%',

    })
    gsap.to(panelCloseRef?.current , {
      opacity:1
    })
   }
   else{
    gsap.to(panelRef.current, {
      height: '0%',
    })
   }
  } , [panel])
  const submitHandler = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  }
  return (
    <div className='h-screen relative overflow-hidden'>
      <img src="/bg.png" className='w-16 absolute mt-4 ml-4' onClick={()=>{
        navigate('/')
      }}/>
      <div className='h-full w-full'>
        <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'></img>
      </div>
      <div className=' absolute top-0 h-screen  flex flex-col justify-end '> 
          <div className='h-[30%] p-6 bg-white relative'>
            <div className='flex justify-between items-center mb-4'>
              <h4 className='text-2xl font-semibold'>Find a Trip</h4>
             {panel &&  <i ref={panelCloseRef} className="ri-arrow-down-s-line text-3xl" height="32" width="32" onClick={()=>{
                setPanel(false)

              }}></i>}
            </div>
          <form onSubmit={(e) =>{
            submitHandler(e);
          }}>
            <div className="line absolute h-16 w-1 top-[87px] left-[35px] bg-gray-900 rounded-full " ></div>
            <input type='text'  value={pickup} onChange={(e)=>setPickup(e.target.value)} onClick={()=>setPanel(true)} placeholder='Enter your pick up location' className='border bg-[#eee] px-12  py-2 rounded-lg w-full mb-2' />
            <input type='text' value={destination} onChange={(e)=>setDestination(e.target.value)} onClick={()=>setPanel(true)} placeholder='Enter your destination' className='border bg-[#eee] px-12 py-2 rounded-lg w-full'></input>
          </form>
          </div>
          <div ref={panelRef} className={`h-0 bg-white `}>
            <LocationSearchPanel vehiclePanel = {vehiclePanel } setVehiclePanel = {setVehiclePanel}/>

          </div>
      </div>
      <div  ref={vehicleref} className={`fixed z-10 bottom-0 justify-between items-center p-3 text-black  translate-y-full bg-white w-full `} >  
              <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} vehiclePanel={vehiclePanel}  />
      </div>
      <div  ref={confirmref} className={`fixed z-10 bottom-0 justify-between items-center p-3 text-black  translate-y-full bg-white w-full `}>  
              <ConfirmedRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className={`fixed z-10 bottom-0 justify-between items-center p-3 text-black  translate-y-full bg-white w-full `}>  
              <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>
      <div  ref={WaitingForDriverRef} className={`fixed z-10 bottom-0 justify-between items-center p-3 text-black bg-white w-full `}>  
              <WaitForDriver setWaitingDriverPanel={setWaitingDriverPanel}/>
      </div>
    </div>
  )
}

export default Home
