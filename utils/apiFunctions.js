
import { GOOGLE_API_KEY, TRIP_ADVISOR_KEY } from "./api_keys";
import axios from "axios";
import { Landmark } from "./landmark";
import { db } from "../data/idCache";

//function to get city name from input coords using google API
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

const areaRadius = 5000;
const radiusUnit = 'km';

export async function searchLandmarks(searchQuery, latitude, longitude) {
    const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${TRIP_ADVISOR_KEY}&searchQuery=${searchQuery}&latLong=${latitude}%2C${longitude}&radius=${areaRadius}&radiusUnit=${radiusUnit}&language=en`
    // //console.log(url);
    try {
        const response = await axios.get(url);
        const data = response.data;
        //console.log(data);

        const statement = await db.prepareAsync(
            'INSERT INTO id_cache (name, location_id) VALUES ($name, $location_id)'
        );

        data.forEach(dataPoint => {
            try {
                async function insertId(name, location_id) {
                    let result = await statement.executeAsync({ $name: 'bbb', $location_id: 101 });
                    console.log('name and location_id inserted:', result.lastInsertRowId, result.changes);
                }
                insertId(dataPoint.name, dataPoint.location_id);

            } catch (error) {
                console.log(`Failed to insert name and location_id: ${error}`);
            }
        })

    } catch (error) {
        console.log(`Error while searching for name and location_id: ${error}`);
    }
}

export async function searchNearby(latitude, longitude){
    const url =`https://api.content.tripadvisor.com/api/v1/location/nearby_search?category=attractions&latLong=${latitude}%2C${longitude}&radius=${areaRadius}&radiusUnit=${radiusUnit}&language=en&key=${TRIP_ADVISOR_KEY}`;
    console.log(url);
    try {
        const response = await axios.get(url);
        console.log('API Response:', response.data);

        // Access the correct data array
        const landmarks = response.data.data;
        
        if (!Array.isArray(landmarks)) {
            throw new Error('Expected an array of landmarks');
        }

        // Prepare the database statement
        const statement = (await db).prepareSync (
            'INSERT INTO id_cache (name, location_id) VALUES ($name, $location_id)'
        );

        // Insert each landmark into the database
        for (const landmark of landmarks) {
            try {
                await statement.executeAsync({ 
                    $name: landmark.name, 
                    $location_id: landmark.location_id 
                });
                console.log('Inserted landmark:', landmark.name, landmark.location_id);
            } catch (error) {
                console.error(`Failed to insert landmark: ${error}`);
            }
        }

    } catch (error) {
        console.error(`Error while searching for nearby landmarks: ${error}`);
    }
}