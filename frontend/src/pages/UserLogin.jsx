import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserData } = useContext(UserDataContext);
    const {socket} = useContext(SocketContext);
    const navigate = useNavigate();

    // State to track if the socket is connected
    const [isSocketConnected, setIsSocketConnected] = useState(socket?.connected || false);
    // Effect to listen for socket connection changes
    


    const handleSubmit = async (e) => {
        e.preventDefault();


        const User = {
            email: email,
            password: password,
            socketId: socket.id // Now we are sure socket.id exists
        };

        try {
            const response = await axios.post(`${import.meta.env.VERCEL_BASE_URL}/users/login`, User);

            if (response.status === 200) {
                const data = response.data;
                setUserData(data?.user);
                localStorage.setItem('token', data?.token);

                // Correctly emit the 'alive' event after successful login
                // The first argument is the event name, the second is the data payload (optional)
                socket.emit('alive', { user: data?.user.fullName.firstName +" "+ data?.user.fullName.lastName });

                console.log("'alive' event emitted to the server.");
                navigate('/home');
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed, please check your credentials and try again.");
        }
    };

    return (
        <div className='flex-col flex justify-between h-screen w-screen'>
            <div>
                <Link to='/'><img src="bg.png" className='w-16 mb-10 mt-5 ml-5' alt="logo" /></Link>
                <form className='p-7 w-screen' onSubmit={handleSubmit}>
                    <h3 className='text-lg mb-2 font-semibold'>What's your email ?</h3>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border bg-[#eeeeee] mb-7 rounded px-4 py-2 m-2 w-full text-lg placeholder:text-gray-500"
                        required
                    />
                    <h3 className='text-lg mb-2 font-semibold'>Enter your Password</h3>
                    <input
                        className="border bg-[#eeeeee] mb-7 rounded px-4 py-2 m-2 w-full text-lg placeholder:text-gray-500"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                    />
                    {/* Disable button until socket is connected for better UX */}
                    <button
                        type="submit"
                        disabled={!isSocketConnected}
                        className="border bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 m-2 w-full text-lg placeholder:text-gray-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isSocketConnected ? 'Login' : 'Connecting...'}
                    </button>
                </form>
                <p className='mx-7 px-2'>New here ? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
            </div>
            <div className=' p-7'>
                <Link to='/captain-login'
                    className='text-white font-semibold flex items-center justify-center mb-5 rounded px-4 py-2 m-2 w-full text-lg placeholder:text-gray-500 bg-[#10b461] '>
                    Sign in as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;