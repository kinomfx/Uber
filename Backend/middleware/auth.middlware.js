import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import Blacklist from "../models/blacklist.model.js";
import Captain from "../models/captain.model.js";

export const  verifyTokenAndGetAccount = async (token) =>{
    if (!token) return null;

    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Try User
    let account = await User.findById(decoded._id).select("-password");
    if (account) return { type: "user", account };

    // Try Captain
    account = await Captain.findById(decoded._id).select("-password");
    if (account) return { type: "captain", account };

    return null;
}

export const authUser = async(req , res , next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const isBlacklisted = await Blacklist.findOne({"token":token});
    if(isBlacklisted){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
     try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const user = await User.findById(decoded._id).select("-password");
        req.user = user 
        return next()
     } catch (error) {
        return res.status(401).json({
            message:"Unauthorized"
        })
     }
}



export const authCaptain = async(req , res , next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log(token)
    const isBlacklisted = await Blacklist.findOne({"token":token});
    if(isBlacklisted){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
     try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const captain = await Captain.findById(decoded._id).select("-password");
        req.captain = captain 
        return next()
     } catch (error) {
        return res.status(401).json({
            message:"Unauthorized"
        })
     }
}