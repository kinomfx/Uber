import { hash } from "bcrypt";
import Captain from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.services.js";
import Blacklist from "../models/blacklist.model.js";
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
    const { fullName, email, password, vehicle } = req.body;
    const hashPassword = await Captain.hashPassword(password); 
    const captain = await createCaptain(fullName, email, hashPassword, vehicle);
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
    const { email, password } = req.body;
    console.log(email, password);
    const captain = await Captain.findOne({ email }).select('+password');
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