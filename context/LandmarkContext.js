import React, { createContext, useState, useEffect, useContext } from 'react';
import { getNearbyLandmarks } from '../utils/apiFunctions';
import { LocationContext } from './LocationContext';

export const LandmarkContext = createContext();

export default function LandmarkProvider({ children }) {
    const [landmarks, setLandmarks] = useState([]);
    const { location } = useContext(LocationContext);

    useEffect(() => {
        async function fetchLandmarks() {
            try {
                if (location) {
                    const landmarkData = await getNearbyLandmarks(location.coords.latitude, location.coords.longitude);
                    setLandmarks(landmarkData);
                    console.log('Landmark Data:', landmarkData)
                }
                //console.log('Successfully retrieved landmarks', landmarks);
            } catch (error) {
                console.log(`Unable to fetch landmarks: ${error}`);
            }
        }

        fetchLandmarks();
    }, [location]);

    return (
        <LandmarkContext.Provider value={{ landmarks }}>
            {children}
        </LandmarkContext.Provider>
    );
}
