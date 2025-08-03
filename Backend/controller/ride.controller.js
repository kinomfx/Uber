import { create } from "../services/rides.services.js";
import { validationResult } from "express-validator";
export const CreateRide = async (req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {  pickup , destination , vehicleType}  = req.body;
    try {
        const ride = await create({user:req.user._id ,pickup , destination , vehicleType });
        return res.status(200).json({ride});
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
      
}