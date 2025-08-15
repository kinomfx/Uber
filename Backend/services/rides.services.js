import {getOriginDestination} from './maps.services.js'
import { Ride } from '../models/ride.models.js';

function getOTP(length = 6) {
    let otp = '';
    while (otp.length < length) {
        const digit = Math.floor(Math.random() * 10); // 0–9
        otp += digit.toString();
    }
    return otp;
}

export const create = async ({ user, pickup, destination, vehicleType }) => {
    try {
        if (!user || !pickup || !destination || !vehicleType) {
            throw new Error("All fields are required");
        }

        const fare = await getFare(pickup, destination);
        console.log("Calculated fare:", fare);

        if (!fare[vehicleType]) {
            throw new Error(`Vehicle type "${vehicleType}" is invalid. Options: ${Object.keys(fare).join(", ")}`);
        }

        const ride = await Ride.create({
            user,
            pickup,
            destination,
            fare: fare[vehicleType],
            OTP: getOTP(5)
        });

        return ride;
    } catch (err) {
        console.error("Error in create():", err);
        throw err; // let Express error handler send 500
    }
};

export const getFare = async (pickup, destination) => {
    try {
        if (!pickup || !destination) {
            throw new Error('pickup or destination are required or are not valid');
        }

        const { distance, duration } = await getOriginDestination(pickup, destination);
        console.log("Distance/Duration:", distance, duration);

        let km = 0;
        if (distance && typeof distance === 'string') {
            const cleaned = distance.replace(/,/g, '').match(/(\d+(\.\d+)?)/);
            if (cleaned) {
                km = parseFloat(cleaned[1]);
            }
        }

        if (isNaN(km) || km <= 0) {
            throw new Error(`Invalid distance "${distance}"`);
        }

        let mins = 0;
        if (duration && typeof duration === 'string') {
            const dayMatch = duration.match(/(\d+)\s*day[s]?/);
            if (dayMatch) mins += parseInt(dayMatch[1], 10) * 24 * 60;

            const hourMatch = duration.match(/(\d+)\s*hour[s]?/);
            if (hourMatch) mins += parseInt(hourMatch[1], 10) * 60;

            const minMatch = duration.match(/(\d+)\s*min[s]?/);
            if (minMatch) mins += parseInt(minMatch[1], 10);
        }

        const fares = {
            car: { perKm: 15, perMin: 2, base: 40 },
            bike: { perKm: 7, perMin: 1, base: 20 },
            auto: { perKm: 10, perMin: 1.5, base: 30 }
        };

        const result = {};
        for (const type in fares) {
            const { perKm, perMin, base } = fares[type];
            const fare = base + km * perKm + mins * perMin;
            result[type] = Math.round(fare);
        }

        return result;
    } catch (err) {
        console.error("Error in getFare():", err);
        throw err;
    }
};
