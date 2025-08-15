import { Router } from "express";
import { body } from "express-validator";
import { register , login  , profile , logout, updateCaptainLocation} from "../controller/captain.controller.js";
import { authCaptain } from "../middleware/auth.middlware.js";
const captianRouter = Router();

captianRouter.post("/register",[
    body('email').isEmail().withMessage('invalid email'),
    body('fullName.firstName').isLength({min:3}).withMessage("firstname must be of length 3"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long"),
    body('vehicle.color').isLength({min:3}).withMessage("Color must be at least 3 characters"),
    body('vehicle.plate').isLength({min:3}).withMessage("Plate must be at least 3 characters"),
    body('vehicle.capacity').isInt({min:1, max:10}).withMessage("Capacity must be between 1 and 10"),
    body('vehicle.vehicleType').isIn(['bike', 'car', 'auto']).withMessage("Vehicle type must be one of bike, car, or auto")

]  ,  register)
captianRouter.post("/login", [
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
], login);

captianRouter.get("/profile",authCaptain , profile)
captianRouter.get("/logout",authCaptain , logout)
captianRouter.post('/location' , authCaptain , updateCaptainLocation)
export default captianRouter;