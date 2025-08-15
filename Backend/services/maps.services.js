import axios from 'axios';

export const getAddressCoordinate = async (address) => {
    if (!address) throw new Error('Address is required');
    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) throw new Error('Google Maps API key not set in environment');
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        const results = response.data.results;
        if (results && results.length > 0) {
            const location = results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng
            };
        } else {
            throw new Error('No coordinates found for the given address');
        }
    } catch (error) {
        throw new Error('Failed to fetch coordinates: ' + error.message);
    }
}

export const getOriginDestination = async (origin, destination) => {
    if (!origin || !destination) throw new Error('Origin and destination are required');
    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) throw new Error('Google Maps API key not set in environment');
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        const routes = response.data.routes;
        if (routes && routes.length > 0 && routes[0].legs && routes[0].legs.length > 0) {
            const leg = routes[0].legs[0];
            return {
                distance: leg.distance.text, // e.g. "5.6 km"
                duration: leg.duration.text // e.g. "12 mins"
            };
        } else {
            throw new Error('No route found between origin and destination');
        }
    } catch (error) {
        throw new Error('Failed to fetch route info: ' + error.message);
    }
}

export const GetSuggestionList = async (address) => {
    if (!address) throw new Error('Address is required');
    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) throw new Error('Google Maps API key not set in environment');
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        const predictions = response.data.predictions;
        if (predictions && predictions.length > 0) {
            // Return an array of suggestion strings
            return predictions.map(p => p.description);
        } else {
            return [];
        }
    } catch (error) {
        throw new Error('Failed to fetch suggestions: ' + error.message);
    }
}

export const getLocation = async () => {
    if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error('User denied the request for Geolocation.'));
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error('Location information is unavailable.'));
                        break;
                    case error.TIMEOUT:
                        reject(new Error('The request to get user location timed out.'));
                        break;
                    default:
                        reject(new Error('An unknown error occurred while fetching location.'));
                        break;
                }
            }
        );
    });
};