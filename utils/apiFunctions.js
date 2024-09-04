import { GOOGLE_API_KEY, GOOGLE_MAPS_API_KEY } from "./api_keys";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Landmark } from "./landmark";

//Function to get city name from input coords using Google API
export async function getCity(latitude, longitude) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        let city = '';
        data.results[0].address_components.forEach(component => {

            if (component.types[0].includes("locality")) {
                city = component.long_name;
            }
        });
        return city;

    } catch (error) {
        console.log(error);
    }
}


export async function getNearbyLandmarks(latitude, longitude) {
    let landmarks = [];
    const searchNearbyUrl = 'https://places.googleapis.com/v1/places:searchNearby';
    try {
        const response = await axios.post(searchNearbyUrl, {
            includedTypes: ["tourist_attraction"],
            maxResultCount: 20,
            locationRestriction: {
                circle: {
                    center: {
                        latitude: latitude,
                        longitude: longitude,
                    },
                    radius: 1000.0,
                },
            },
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
                'X-Goog-FieldMask': 'places.id,places.displayName,places.photos,places.formattedAddress,places.location,places.businessStatus,places.regularOpeningHours,places.priceLevel,places.rating,places.userRatingCount,places.websiteUri',
            }
        });

        if (!response || !response.data) {
            throw new Error("Response or response data is undefined");
        }
        const placeData = response.data.places;
        if (!placeData || placeData.length === 0) {
            throw new Error("Place data is undefined or empty");
        }

        console.log('Place Data:', placeData);

        for (const place of placeData) {
            //console.log(place);
            const placePhoto = await getPlacePhoto(place.photos[0].name);
            //console.log(`Place photo: ${placePhoto}`);
            const newLandmark = new Landmark(
                place.displayName.text,
                place.location.latitude,
                place.location.longitude,
                place.formattedAddress,
                place.businessStatus,
                placePhoto,
                place.id,
                place.regularOpeningHours,
                place.rating,
                place.userRatingCount,
                place.websiteUri
            );
            //console.log(newLandmark.currentOpeningHours)
            landmarks.push(newLandmark);
            console.log('Succesfully retrieved landmark:', landmarks);
        }
        return landmarks;
    } catch (error) {
        console.log(`Unable to get nearby landmarks in getNearbyLandmarks: ${JSON.stringify(error.response.data)}`)
    }
}

const maxWidthPx = '720';

//Check api doc if unclear
async function getPlacePhoto(api_photo_name) {
    const photoURL = `https://places.googleapis.com/v1/${api_photo_name}/media?key=${GOOGLE_MAPS_API_KEY}&maxWidthPx=${maxWidthPx}&skipHttpRedirect=true`;

    try {
        const response = await axios.get(photoURL);
        console.log(`Photo response: ${response.photoUri}`);
        return response.data.photoUri;
    } catch (error) {
        console.log(`Error fetching image with api photo resource name ${photoURL}: ${error}`);
    }

}