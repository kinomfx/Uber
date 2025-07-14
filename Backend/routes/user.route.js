import { Router } from "express";
import { login, register } from "../controller/user.controller.js";
import { body } from "express-validator";

const Userrouter = Router()


Userrouter.post('/register' , [
    body('email').isEmail().withMessage('invalid email'),
    body('fullName.firstName').isLength({min:3}).withMessage("firstname must be of length 3"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
], 
    register)


Userrouter.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
]  , login);
export default Userrouter