//function to get city name from input coords using google API
import { GOOGLE_API_KEY, GEOAPIFY_API_KEY } from "./api_keys";
import axios from "axios";
import { Landmark } from "./landmark";

export async function getCity(latitude, longitude) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        let city ='';
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

export async function getLandmarks(latitude, longitude) {
    const url =`https://api.geoapify.com/v2/places?categories=tourism&filter=circle:${longitude},${latitude},${areaRadius}&apiKey=${GEOAPIFY_API_KEY}`;
    //console.log(url);
    try {
        const response = await axios.get(url);
        //const data = response.data.features[0].properties;
        const data = response.data.features;
        console.log(data);
        const landmarks = [];

        
        
    } catch (error) {

    }
}