import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PlaceCard from './PlaceCard';
import { getLocationPhoto, getStoredLandmarks } from '../../utils/apiFunctions';


export default function CardCarousel({ customStyle }) {
    const [landmarks, setLandmarks] = useState([]);

    useEffect(() => {
        async function fetchLandmarks() {
            try {
                const storedLandmarks = await getStoredLandmarks();
                setLandmarks(storedLandmarks);
                //console.log(landmarks);
            } catch (error) {
                console.error('Failed to fetch landmarks from storage:', error);
            }
        }
        fetchLandmarks();
    }, []);

    return (
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.container, customStyle]}
        >
            {landmarks.map((landmark, index) => (
                <PlaceCard
                    key={index}
                    locationId={landmark.location_id}
                    title={landmark.name}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});
