//function to get city name from input coords using google API
import { API_KEY } from "./api_keys"
import axios from "axios";

export async function getCity(latitude, longitude) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
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