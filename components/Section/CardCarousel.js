import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PlaceCard from './PlaceCard';
import { placeholders } from '../../data/placeholders/places'; 

export default function CardCarousel({customStyle}) {
    return (
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.container, customStyle]}
        >
            {placeholders.map((item, index) => (
                <PlaceCard
                    key={index}
                    imageUri={item.imageUri}
                    title={item.title}
                    location={item.location}
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
