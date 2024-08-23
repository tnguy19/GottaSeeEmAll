import React, { createContext, useState, useEffect, useContext } from 'react';
import { getLandmarks } from '../utils/apiFunctions';
import { LocationContext } from './LocationContext';

export const LandmarkContext = createContext();

export default function LandmarkProvider ({ children }) {
    const [landmarks, setLandmarks] = useState([]);
    const {location} = useContext(LocationContext);

    useEffect(() => {
        async function fetchCityAndLandmarks() {
            if (location) {
                const landmarkData = await getLandmarks(location.coords.latitude, location.coords.longitude);
                setLandmarks(landmarkData);
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
