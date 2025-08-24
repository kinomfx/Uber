import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
import ConnectDB from "./db/db.js";
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Make sure your frontend runs on this address
    methods: ["GET", "POST"],
    credentials: true
  }
});


io.on('connection', (socket) => {
    // 'socket' here represents the individual client that just connected.
    console.log('A user connected with ID:', socket.id);

    // 1. Emit an event ONLY to the newly connected user.
    socket.emit('hi', 'Welcome to the server!');

    socket.on('register_captain', (vehicleType) => {
        console.log(`Captain ${socket.id} registered with vehicle type: ${vehicleType}`);
        socket.join(vehicleType);  
        console.log(`Captain ${socket.id} joined room: ${vehicleType}`);
    });
    
    socket.on('new_ride_available', (data) => {
        console.log(`new ride available: ${socket.id}`);
        console.log(data);
        const {vehicleToggle} = data;
        // Broadcast to everyone EXCEPT the sender.
        io.to(vehicleToggle).emit('new_ride', data);
    });

    socket.on('ride_accepted', (data) => {
    const targetSocketId = data.socketId; 

    console.log(`Ride accepted by: ${socket.id}, notifying: ${targetSocketId}`);
    console.log(data);
        
    io.to(targetSocketId).emit('ride_accepted_notification', {
        driverId: socket.id ,
        rideData:data.rideData ,
        driverName : data.captain.fullName.firstName , 
        plateNumber : data.captain.vehicle.plate , 
        vehicleType : data.captain.vehicle.vahicleType
    });
});


    // 3. Handle disconnection for this specific user.
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// This part remains the same.
ConnectDB();

// Ensure your backend .env has PORT=8000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log("Server is listening on Port", PORT);
});