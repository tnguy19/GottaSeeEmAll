import { GOOGLE_API_KEY, TRIP_ADVISOR_KEY } from "./api_keys";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const areaRadius = 5000;
const radiusUnit = 'km';

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

// Function to search nearby landmarks with TripAdvvisor API
export async function searchNearby(latitude, longitude) {
    const url = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?category=attractions&latLong=${latitude}%2C${longitude}&radius=${areaRadius}&radiusUnit=${radiusUnit}&language=en&key=${TRIP_ADVISOR_KEY}`;
    //console.log(url);
    try {
        const response = await axios.get(url);
        const landmarksData = response.data.data;

        if (!Array.isArray(landmarksData)) {
            throw new Error('Expected an array of landmarks');
        }

        const landmarks = landmarksData.map(landmark => ({
            name: landmark.name,
            location_id: landmark.location_id
        }));

        await AsyncStorage.setItem('landmarks', JSON.stringify(landmarks));
        console.log('Landmarks saved to device storage.');
    } catch (error) {
        console.error(`Error while searching for nearby landmarks: ${error}`);
    }
}

// Function to retrieve landmarks from local device
export async function getStoredLandmarks() {
    try {
        const landmarks = await AsyncStorage.getItem('landmarks');
        return landmarks ? JSON.parse(landmarks) : [];
    } catch (error) {
       console.error('Failed to load landmarks from storage:', error);
    }
}

// Function to get location photos
export async function getLocationPhoto(locationId) {
    const url = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?language=en&key=${TRIP_ADVISOR_KEY}`;
    //console.log('TripAdvisor Photos API URL:', url);

    try {
        const response = await axios.get(url);
        const photosData = response.data.data || [];

        //console.log(photosData);
        const imageLinks = photosData.map(dataPoint => ({
            imageUrl: dataPoint.images?.medium?.url || '',
        })).filter(photoInfo => photoInfo.imageUrl); // filter out empty URLs
        //console.log(imageLinks)

        return imageLinks;
    } catch (error) {
        console.error(`Failed to get location photo with id ${locationId}:`, error);
        return [];
    }
}
