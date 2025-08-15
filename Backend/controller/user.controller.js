import { createUser } from "../services/user.services.js";
import { validationResult } from "express-validator";
import  User  from "../models/user.model.js";
import Blacklist from "../models/blacklist.model.js";
export const register = async(req , res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    
    //console.log(req.body)
    const {fullName, email , password , socketId} = req.body;
    const doesUserExist = await User.find({email});
    if(doesUserExist.length > 0){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const hashedPassword = await User.hashPassword(password);
    console.log(hashedPassword)
    console.log(fullName.firstName)
    const user = await createUser({firstName:fullName.firstName , lastName:fullName.lastName , email , password:hashedPassword ,socketId } )
    const token = await user.generateAuthToken()
    res.status(201).json({token , user})
}

export const login = async(req , res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    const {email , password ,socketId} = req.body;
    const user = await User.findOne({email}).select('+password');
    await User.findOneAndUpdate({email},{socketId})
    if(!user){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }
    const isMatch = await user.comparePassword(password);
    const Token = await user.generateAuthToken();
    res.cookie("token", Token)
    if(!isMatch){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }
    res.status(200).json({token:Token , user})
}

export const getProfile = async(req , res , next)=>{
    const user = req.user;
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    res.status(200).json({
        user
    })
}

export const logout = async(req , res , next)=>{
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await Blacklist.create({token});
    res.status(200).json({
        message:"Logged out successfully"
    })
}