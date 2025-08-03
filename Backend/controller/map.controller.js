import { getAddressCoordinate, getOriginDestination, GetSuggestionList } from "../services/maps.services.js"
import { validationResult } from "express-validator";

export const mapController = async (req , res)=>{
    const {address} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json(coordinates)
    } catch (error) {
        res.status(404).json("COORDINATES NOT FOUND");
    }
}

export const getDistanceTime = async(req , res)=>{
    const {origin , destination} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const response = await getOriginDestination(origin , destination);
        console.log(response);
        res.status(200).json({response});
    } catch (error) {
        res.status(404).json("Something went wrong");
    }
}

export const getSuggestions = async(req , res)=>{
    const {address} = req.body;
    try {
        const suggestions = await GetSuggestionList(address);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
}