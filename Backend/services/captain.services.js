import Captain from "../models/captain.model.js";

import { validationResult } from "express-validator";

export const createCaptain = async (fullName , email , hashPassword , vehicle ,socketId) => {
    if(!fullName || !email || !hashPassword || !vehicle) {
        throw new Error("All fields are required");
    }
    const captain = await Captain.create({
        fullName:{
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password: hashPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        } ,
        socketId
        
    });

    return captain;
}