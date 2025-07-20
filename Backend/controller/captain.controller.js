import { hash } from "bcrypt";
import Captain from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.services.js";
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