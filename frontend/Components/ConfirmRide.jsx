import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';

const ConfirmRide = ({ setConfirmRidePanel, setRidePopUpPanel, rideData }) => {
  const [otp, setOTP] = useState('');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [fare, setFare] = useState('');
  const [userName, setUserName] = useState('');
  const [distance, setDistance] = useState(0);

  const { socket } = useContext(SocketContext);
  const captain = useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    setPickup(rideData?.pickup);
    setDestination(rideData?.destination);
    setFare(rideData?.fare);
    setUserName(rideData?.userName);
  }, [rideData]);
  console.log("ride data in confirm ride : ", rideData);

  const checkOTP = (enteredOTP) => {
    return enteredOTP === rideData?.otp;
  };

    const submitHandler = (e) => {
    e.preventDefault();
    if (checkOTP(otp)) {
      // OTP matched ✅
      setConfirmRidePanel(false); // close confirm panel
      setRidePopUpPanel(false);   // also close ride popup if needed
      navigate("/captain-riding", {
        state: { rideData }
      });
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };
  

  return (
    <div>
      <div className='flex w-full justify-between'>
        <h3 className='text-2xl font-semibold mb-5'>Confirm Your Ride</h3>
        <i
          className="ri-arrow-down-s-line text-3xl"
          onClick={() => setConfirmRidePanel(false)}
        ></i>
      </div>

      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-xl'>
        <div className='flex items-center gap-3 '>
          <img src="/MONIKUSER.jpg" className='h-15 w-15 rounded-full object-cover ' alt="" />
          <h2 className='text-xl font-medium'>{userName}</h2>
        </div>
        <h5 className='text-lg font-semibold'>{distance} km</h5>
      </div>

      <div className='flex flex-col gap-5 justify-center items-center w-full'>
        <div className='w-full mt-5'>
          <div className='flex gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-line text-2xl "></i>
            <div>
              <h3 className='text-lg font-medium'>
                {pickup?.split(' ').slice(0, 2).join(' ')}
              </h3>
              <p className='text-sm text-gray-600'>{pickup?.split(' ').slice(2).join(' ')}</p>
            </div>
          </div>
          <div className='flex gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-range-fill text-2xl"></i>
            <div>
              <h3 className='text-lg font-medium'>
                {destination?.split(' ').slice(0, 2).join(' ')}
              </h3>
              <p className='text-sm text-gray-600'>{destination?.split(' ').slice(2).join(' ')}</p>
            </div>
          </div>
          <div className='flex gap-5 p-3 '>
            <i className="ri-cash-line text-2xl"></i>
            <div>
              <h3 className='text-lg font-medium'>
                ₹{fare ? fare : ''}
              </h3>
            </div>
          </div>
        </div>

        {/* OTP Form */}
        <div className='flex items-center justify-center w-full'>
          <form onSubmit={submitHandler} className='w-full'>
            <input
              type="text"
              placeholder='Enter OTP'
              className='border bg-[#eee] px-12 py-2 rounded-lg w-full mb-2'
              onChange={(e) => setOTP(e.target.value)}
              value={otp}
            />
            <button
              type="submit"
              className='w-full border-2 rounded-lg p-2 flex justify-center bg-green-600 text-white font-semibold'
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={async () => {
                // cancel logic
                setConfirmRidePanel(false);
                setRidePopUpPanel(false);
              }}
              className='w-full border-2 rounded-lg p-2 mt-2 bg-red-700 text-white font-semibold'
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRide;
