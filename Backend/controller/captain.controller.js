import { hash } from "bcrypt";
import Captain from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.services.js";
import Blacklist from "../models/blacklist.model.js";
import captianRouter from "../routes/captian.routes.js";
export const register = async (req, res, next) => {
    const errors = validationResult(req);
    const doesCaptainExist = await Captain.findOne({ email: req.body.email });
    if (doesCaptainExist) {
        return res.status(400).json({
            message: "Captain already exists"
        });
    }
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { fullName, email, password, vehicle , socketId } = req.body;
    const hashPassword = await Captain.hashPassword(password); 
    const captain = await createCaptain(fullName, email, hashPassword, vehicle , socketId);
    const token = await captain.generateAuthToken();
    res.status(201).json({ token, captain });

}

export const login = async (req, res, next) => {    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password  , socketId} = req.body;
    console.log(email, password);
    const captain = await Captain.findOne({ email }).select('+password');
    await Captain.findOneAndUpdate({email} , {socketId})
    if (!captain) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
    const token = await captain.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, captain });
}

export const profile = async (req, res, next) => {
    const captain = req.captain;
    if (!captain) {
        return res.status(404).json({
            message: "Captain not found"
        });
    }
    res.status(200).json({ captain });
}

export const logout = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    await Blacklist.create({ token });
    res.clearCookie("token");
    res.status(200).json({
        message: "Logged out successfully"
    });
}

export const updateCaptainLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        if (latitude === undefined || longitude === undefined) {
            return res.status(400).json({ message: "Latitude and longitude are required" });
        }

        // Threshold in degrees (~0.0001° ≈ 11 meters)
        const THRESHOLD = 0.0001;

        // 1. Get current captain
        const currentCaptain = await Captain.findById(req.captain._id);
        if (!currentCaptain) {
            return res.status(404).json({ message: "Captain not found" });
        }

        const currentLat = currentCaptain.vehicle?.location?.latitude || 0;
        const currentLng = currentCaptain.vehicle?.location?.longitude || 0;

        // 2. Check if movement is significant
        const latDiff = Math.abs(latitude - currentLat);
        const lngDiff = Math.abs(longitude - currentLng);

        if (latDiff < THRESHOLD && lngDiff < THRESHOLD) {
            return res.json({ message: "Location change too small, no update needed"  , captain:currentCaptain});
        }

        // 3. Update only if significant change
        const captain = await Captain.findOneAndUpdate(
            { _id: req.captain._id },
            { 
                $set: {
                    'vehicle.location.latitude': latitude,
                    'vehicle.location.longitude': longitude
                }
            },
            { new: true }
        );

        res.json({ message: "Location updated", captain:captain});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


