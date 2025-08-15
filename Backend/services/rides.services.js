import {getOriginDestination} from './maps.services.js'
import { Ride } from '../models/ride.models.js';
import crypto from "crypto"
function getOTP(length) {
    if (typeof length !== 'number' || length <= 0) {
        throw new Error('Length must be a positive integer');
    }

    let otp = '';
    while (otp.length < length) {
        const byte = crypto.randomBytes(1)[0];
        const digit = byte % 10;
        otp += digit.toString();
    }

    return otp;
}
export const create = async ({user , pickup , destination , vehicleType})=>{
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error("All fields are required")
    }
    const fare = await getFare(pickup , destination);
    console.log(fare)
    const ride = await Ride.create({user , pickup , destination , fare:fare[vehicleType]  ,OTP:getOTP(5)});
    return ride;
}
export const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('pickup or destination are required or are not valid');
    }

    const { distance, duration } = await getOriginDestination(pickup, destination);
    console.log(distance, duration);

    // Clean up distance string
    let km = 0;
    if (distance && typeof distance === 'string') {
        // Remove commas and extract numeric part
        const cleaned = distance.replace(/,/g, '').match(/(\d+(\.\d+)?)/);
        if (cleaned) {
            km = parseFloat(cleaned[1]);
        }
    }

    if (isNaN(km) || km <= 0) throw new Error('Invalid distance');

    // Parse duration into total minutes
    let mins = 0;
    if (duration && typeof duration === 'string') {
        const dayMatch = duration.match(/(\d+)\s*day[s]?/);
        if (dayMatch) mins += parseInt(dayMatch[1], 10) * 24 * 60;

        const hourMatch = duration.match(/(\d+)\s*hour[s]?/);
        if (hourMatch) mins += parseInt(hourMatch[1], 10) * 60;

        const minMatch = duration.match(/(\d+)\s*min[s]?/);
        if (minMatch) mins += parseInt(minMatch[1], 10);
    }

    // Fare rates and base fares for each vehicle type
    const fares = {
        car: { perKm: 15, perMin: 2, base: 40 },
        bike: { perKm: 7, perMin: 1, base: 20 },
        auto: { perKm: 10, perMin: 1.5, base: 30 }
    };

    // Calculate fare for each type
    const result = {};
    for (const type in fares) {
        const { perKm, perMin, base } = fares[type];
        const fare = base + km * perKm + mins * perMin;
        result[type] = Math.round(fare);
    }

    return result;
};
