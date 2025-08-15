import express from "express"
import { authCaptain } from "../middleware/auth.middlware.js";
import { verifyTokenAndGetAccount } from "../middleware/auth.middlware.js";
export const  router = express.Router();
import { getDistanceTime, mapController } from "../controller/map.controller.js";
import { authUser } from "../middleware/auth.middlware.js";
import {query} from "express-validator"
import { getSuggestions } from "../controller/map.controller.js";
router.get('/get-coordinates', query('address').isString().isLength({min:3}) ,authUser , mapController)
router.get('/get-distance-time' ,   query('origin').isString().isLength({min:3}) , query('destination').isString().isLength({min:3}) , authUser , getDistanceTime)
router.get('/get-suggestions' , query('address').isString().isLength({min:3}) , authUser , getSuggestions);