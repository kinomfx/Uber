import { createUser } from "../services/user.services.js";
import { validationResult } from "express-validator";
import  User  from "../models/user.model.js";
export const register = async(req , res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    //console.log(req.body)
    const {fullName, email , password} = req.body;
    const hashedPassword = await User.hashPassword(password);
    console.log(hashedPassword)
    console.log(fullName.firstName)
    const user = await createUser({firstName:fullName.firstName , lastName:fullName.lastName , email , password:hashedPassword})
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
    const {email , password} = req.body;
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }
    const isMatch = await user.comparePassword(password);
    const Token = await user.generateAuthToken();
    if(!isMatch){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }
    res.status(200).json({token:Token , user})
}