import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PlaceCard from './PlaceCard';

export default function CardCarousel({ customStyle, landmarks }) {
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
                    locationId={landmark.api_id}
                    title={landmark.name}
                    address={landmark.address}
                    imageUri={landmark.photo}
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
