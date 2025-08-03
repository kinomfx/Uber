import express from "express";
import { Router } from "express";
import {body} from "express-validator"
import { CreateRide } from "../controller/ride.controller.js";
import { authUser } from "../middleware/auth.middlware.js";
export const RideRouter = Router();

RideRouter.post('/create' ,authUser, 
body('pickup').isString().isLength({min:3}).withMessage("Invalid PickUp Address") , 
body('destination').isString().isLength({min:3}).withMessage("invalid Destination Address") ,
body('vehicleType').isString().isIn(['auto' , 'car' ,'bike']).withMessage("Invalide VehicleType")
, CreateRide);