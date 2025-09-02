import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import VehiclePanel from '../../Components/VehiclePanel.jsx'
import LocationSearchPanel from '../../Components/LocationSearchPanel.jsx'
import ConfirmedRide from '../../Components/ConfirmedRide.jsx'
import WaitForDriver from '../../Components/WaitForDriver.jsx'
import LookingForDriver from '../../Components/LookingForDriver.jsx'
import axios from 'axios'
import { SocketContext } from '../../context/SocketContext.jsx'
import { getLocation } from '../../Methods/utils.js'
import Maps from '../../Methods/maps.jsx'

const Home = () => {
  const { socket } = useContext(SocketContext)
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panel, setPanel] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingDriverPanel, setWaitingDriverPanel] = useState(false)
  const [driverName, setDriverName] = useState('')
  const [plateNumber, setPlateNumber] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [query, setQuery] = useState('')
  const [toggle, setToggle] = useState('pickup')
  const [fare, setFare] = useState({ car: 0, bike: 0, auto: 0 })
  const [vehicleToggle, setVehicleToggle] = useState('car')
  const vehicleFoundRef = useRef(null)
  const vehicleref = useRef(null)
  const confirmref = useRef(null)
  const WaitingForDriverRef = useRef(null)
  const location = useLocation()
  const [locationData, setLocationData] = useState({ lat: 0, lng: 0 })
  const navigate = useNavigate()
  const [originLoc, setOriginLoc] = useState('')
  const [destinationLoc, setDestinationLoc] = useState('')
  const [otp, setOTP] = useState(null)

  // get live location
  useEffect(() => {
    const func = async () => {
      try {
        const obj = await getLocation()
        console.log(obj)
        setLocationData({lat:obj.latitude , lng:obj.longitude})
      } catch (error) {
        throw error
      }
    }
    func()
    const intervalref = setInterval(func, 10000)
    return () => {
      clearInterval(intervalref)
    }
  }, [])

  // socket ride accepted
  useEffect(() => {
    if (socket) {
      const handleAccepted = (data) => {
        setDriverName(data.driverName)
        setVehicleType(data.vehicleType)
        setPlateNumber(data.plateNumber)
        setWaitingDriverPanel(true)
        setVehicleFound(false)
      }
      socket.on('ride_accepted_notification', handleAccepted);
      socket.on('ride_completed_notification', (data) => {

        setWaitingDriverPanel(false)
        setPickup('')
        setDestination('')
        setVehiclePanel(false)
        setVehicleFound(false)
        setConfirmRidePanel(false)
        setOriginLoc('')
        setDestinationLoc('')
        console.log("Ride Completed");
      })
      return () => {
        socket.off('ride_accepted_notification', handleAccepted)
      }
    }
  }, [socket])

  // GSAP animations
  useGSAP(() => {
    gsap.to(vehicleref.current, {
      transform: vehiclePanel ? 'translateY(0)' : 'translateY(120%)',
    })
  }, [vehiclePanel])

  useGSAP(() => {
    gsap.to(confirmref.current, {
      transform: confirmRidePanel ? 'translateY(0)' : 'translateY(120%)',
    })
  }, [confirmRidePanel])

  useGSAP(() => {
    gsap.to(WaitingForDriverRef.current, {
      transform: waitingDriverPanel ? 'translateY(0)' : 'translateY(120%)',
    })
  }, [waitingDriverPanel])

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? 'translateY(0)' : 'translateY(120%)',
    })
  }, [vehicleFound])

  useGSAP(() => {
    if (panel === true) {
      gsap.to(panelRef.current, {
        height: '70%',
      })
      gsap.to(panelCloseRef?.current, {
        opacity: 1,
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
      })
    }
  }, [panel])

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup: pickup,
          destination: destination,
          vehicleType: vehicleToggle,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      return response
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    const intervalref = setInterval(() => {
      console.log(socket.id)
    } , 1000);
    return () => clearInterval(intervalref);  
  } , [])
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const fare = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup: pickup, destination: destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      ) 
      setOriginLoc(pickup)
      setDestinationLoc(destination)
      setFare(fare.data['response'])
      setVehiclePanel(true)
      setPanel(false)
    } catch (err) {
      console.error('Fare fetch error:', err)
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Logo */}
      <img
        src="/bg.png"
        className="w-16 absolute mt-4 ml-4 z-20 cursor-pointer"
        onClick={() => navigate('/')}
      />

      {/* MAP (always in the back) */}
      <div className="h-full w-full z-0">
        <Maps  pickup={originLoc} destination={destinationLoc}/>
      </div>

      {/* MAIN PANEL (bottom sheet) */}
      <div className="absolute top-0 h-screen flex flex-col justify-end z-10 pointer-events-none">
        <div className="h-[30%] p-6 bg-white relative pointer-events-auto">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-2xl font-semibold">Find a Trip</h4>
            {panel && (
              <i
                ref={panelCloseRef}
                className="ri-arrow-down-s-line text-3xl"
                height="32"
                width="32"
                onClick={() => {
                  setPanel(false)
                }}
              ></i>
            )}
          </div>
          <form
            onSubmit={(e) => {
              submitHandler(e)
            }}
          >
            <div className="line absolute h-16 w-1 top-[87px] left-[35px] bg-gray-900 rounded-full "></div>
            <input
              type="text"
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
                setToggle('pickup')
                setQuery(e.target.value)
              }}
              onClick={(e) => {
                setPanel(true)
              }}
              placeholder="Enter your pick up location"
              className="border bg-[#eee] px-12  py-2 rounded-lg w-full mb-2"
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
                setToggle('destination')
                setQuery(e.target.value)
              }}
              onClick={() => setPanel(true)}
              placeholder="Enter your destination"
              className="border bg-[#eee] px-12 py-2 rounded-lg w-full"
            />
            <button className="bg-black text-white w-full rounded-xl p-1 my-2">
              Find Trip
            </button>
          </form>
        </div>

        <div ref={panelRef} className={`h-0 bg-white pointer-events-auto`}>
          <LocationSearchPanel
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel}
            query={query}
            setPickup={setPickup}
            setDestination={setDestination}
            toggle={toggle}
          />
        </div>
      </div>

      {/* VEHICLE PANEL */}
      <div
        ref={vehicleref}
        className={`fixed z-30 bottom-0 translate-y-full bg-white w-full pointer-events-auto`}
      >
        <VehiclePanel
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          vehiclePanel={vehiclePanel}
          fare={fare}
          setVehicleToggle={setVehicleToggle}
        />
      </div>

      {/* CONFIRM RIDE PANEL */}
      <div
        ref={confirmref}
        className={`fixed z-30 bottom-0 translate-y-full bg-white w-full pointer-events-auto`}
      >
        <ConfirmedRide
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare[vehicleToggle]}
          setVehiclePanel={setVehiclePanel}
          vehicleToggle={vehicleToggle}
          setOTP={setOTP}
        />
      </div>

      {/* LOOKING FOR DRIVER PANEL */}
      <div
        ref={vehicleFoundRef}
        className={`fixed z-30 bottom-0 translate-y-full bg-white w-full pointer-events-auto`}
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          setVehiclePanel={setVehiclePanel}
          pickup={pickup}
          destination={destination}
          fare={fare[vehicleToggle]}
        />
      </div>

      {/* WAITING FOR DRIVER PANEL */}
      <div
        ref={WaitingForDriverRef}
        className={`fixed z-30 bottom-0 translate-y-full bg-white w-full pointer-events-auto`}
      >
        <WaitForDriver
          setWaitingDriverPanel={setWaitingDriverPanel}
          pickup={pickup}
          destination={destination}
          fare={fare[vehicleToggle]}
          setVehicleFound={setVehicleFound}
          plateNumber={plateNumber}
          driverName={driverName}
          vehicleToggle={vehicleToggle}
          otp = {otp}
        />
      </div>
    </div>
  )
}

export default Home
