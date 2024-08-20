import React from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import PlaceCard from './PlaceCard';

const WINDOW_WIDTH = Dimensions.get('window').width;

const carouselItems = [
    { imageUri: require('../../assets/locationImages/test1.jpg'), title: 'Old State House', location: 'Boston' },
    { imageUri: require('../../assets/locationImages/test1.jpg'), title: 'Old State House', location: 'Boston' },
    {imageUri: require('../../assets/locationImages/test1.jpg'), title: 'Old State House', location: 'Boston' }
];

export default function CardCarousel() {
    return (
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {carouselItems.map((item, index) => (
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
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
        padding: 10,
    },
});
