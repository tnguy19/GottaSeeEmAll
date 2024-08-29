import { GOOGLE_API_KEY, TRIP_ADVISOR_KEY, GEO_APIFY_KEY } from "./api_keys";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Landmark } from "./landmark";

const areaRadius = 2000;
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

export async function getNearbyLandmarks(latitude, longitude) {
    const url = `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${longitude},${latitude},${areaRadius}&apiKey=${GEO_APIFY_KEY}`;
    console.log(url);
    try {
        const response = await axios.get(url);
        //const data = response.data.features[0].properties;
        const data = response.data.features;
        //console.log(data);
        const landmarks = [];
        data.forEach(dataPoint => {
            const properties = dataPoint.properties;
            const landmark = new Landmark(properties.name, properties.lat, properties.lon, properties.formatted, properties.datasource.url);
            landmarks.push(landmark);
        })

        // landmarks.forEach(landmark => {
        //     console.log(`landmark: ${landmark.name}, lat: ${landmark.latitude}, lon: ${landmark.longitude},`)
        // })
        return landmarks;
    } catch (error) {
        console.log(`Unable to get nearby landmarks in getNearbyLandmarks: ${error}`)
    }
}

// Function to search nearby landmarks with TripAdvvisor API
export async function searchNearby(landmarks) {
    try {
        // Retrieve existing landmarks from AsyncStorage
        const storedLandmarksJSON = await AsyncStorage.getItem('landmarksID');
        const storedLandmarks = storedLandmarksJSON ? JSON.parse(storedLandmarksJSON) : [];

        for (const landmark of landmarks) {
            const landmarkName = landmark.name;
            const landmarkLat = landmark.latitude;
            const landmarkLong = landmark.longitude;
            const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${TRIP_ADVISOR_KEY}&searchQuery=${landmarkName}&latLong=${landmarkLat}%2C${landmarkLong}&language=en`;

            try {
                const response = await axios.get(url);
                const landmarksData = response.data.data;

                const landmarkID = landmarksData.map(landmark => ({
                    name: landmark.name,
                    location_id: landmark.location_id
                }));

                for (const newLandmark of landmarkID) {
                    const isDuplicate = storedLandmarks.some(storedLandmark =>
                        storedLandmark.location_id === newLandmark.location_id
                    );

                    if (!isDuplicate) {
                        storedLandmarks.push(newLandmark);
                        await AsyncStorage.setItem('landmarksID', JSON.stringify(storedLandmarks));
                        console.log('New landmark added and saved to device storage:', newLandmark.name);
                    } else {
                        console.log('Duplicate landmark:', newLandmark.name);
                    }
                }

            } catch (error) {
                console.error(`Error while searching and storing landmark with url ${url}: ${error}`);
            }
        }
    } catch (error) {
        console.error(`Error in searchNearby function: ${error}`);
    }
}

// Function to retrieve landmarks from local device
export async function getStoredLandmarks() {
    try {
        const landmarksID = await AsyncStorage.getItem('landmarksID');
        console.log(`landmarksID: ${landmarksID}`);
        return landmarksID ? JSON.parse(landmarksID) : [];
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
        })).filter(photoInfo => photoInfo.imageUrl); 
        //console.log(imageLinks)

        return imageLinks;
    } catch (error) {
        console.error(`Failed to get location photo with id ${locationId}:`, error);
        return [];
    }
}
