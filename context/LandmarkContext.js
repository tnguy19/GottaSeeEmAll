import React, { createContext, useState, useEffect, useContext } from 'react';
import { getLandmarks, searchLandmarks, searchNearby } from '../utils/apiFunctions';
import { LocationContext } from './LocationContext';

export const LandmarkContext = createContext();

export default function LandmarkProvider ({ children }) {
    const [landmarks, setLandmarks] = useState([]);
    const {location} = useContext(LocationContext);

    useEffect(() => {
        async function fetchCityAndLandmarks() {
            try {
                if (location) {
                    const landmarkData = await searchNearby(location.coords.latitude, location.coords.longitude);
                    setLandmarks(landmarkData);
                }
            } catch (error) {
                console.log(`Unable to fetch current location: ${error}`);
            }
            
        }
        fetchCityAndLandmarks();
    }, [location]);

    return (
        <LandmarkContext.Provider value={{landmarks}}>
            {children}
        </LandmarkContext.Provider>
    );
};
