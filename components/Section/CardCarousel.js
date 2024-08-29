import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PlaceCard from './PlaceCard';

export default function CardCarousel({ customStyle, storedLandmarkIDs, landmarkPhotos }) {
    return (
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.container, customStyle]}
        >
            {storedLandmarkIDs.map((landmark, index) => (
                <PlaceCard
                    key={index}
                    locationId={landmark.location_id}
                    title={landmark.name}
                    imageUri={landmarkPhotos[landmark.location_id]}
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
