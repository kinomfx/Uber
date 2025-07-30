import React from 'react'

const LocationSearchPanel = ({vehiclePanel , setVehiclePanel}) => {
  const ClickHandler = (e)=>{
    setVehiclePanel(true);
  }
  const locations =[{location:"4B near kapoor's cafe , Sheriyans Coding School , Bhopal"} , 
    {location:"5B near shree rayu's cafe , Delhi Technological University , Delhi"} , 
    {location:"4B near rayus's cafe , Reyansh College of Hotel Management , Hydrabad"}, 
    {location:"4B near Sharmas' cafe , KR Managlam  ,Haryana"}, 
    {location:"4B near Shree's cafe , Sheriyans Coding School , Bhopal"}]
    /*<div className='w-full flex justify-between my-2 text-black active:border-2 '>
              <h2 className='rounded-full bg-gray-400  h-10 w-10 flex justify-center items-center m-1'>
              <i className="px-2 text-2xl ri-map-pin-line"></i>
              </h2>
              <h4 className='px-3'>24B near kapoor's cafe , Sheriyans Coding School , Bhopal</h4>
            </div> */
  return (
    <div>
          {locations.map((ele , index)=>(
            <div onClick={(e)=>ClickHandler(e)} key={index} className='w-full flex justify-between my-2 text-black active:border-2 '>
              <h2 className='rounded-full bg-gray-400  h-10 w-10 flex justify-center items-center m-1'>
              <i className="px-2 text-2xl ri-map-pin-line"></i>
              </h2>
              <h4 className='px-3'>{ele.location}</h4>
            </div>
          ))}
    </div>
  )
}

export default LocationSearchPanel
