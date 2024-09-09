import React, { useContext } from 'react';
import { View, ImageBackground, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { WishlistContext } from '../../context/WishlistContext';

const windowWidth = Dimensions.get('window').width;
const placeholderImageUri = require('../../assets/locationImages/test1.jpg');

export default function PlaceCard(props) {
    const {
        locationId,
        title,
        imageUri,
        address,
        businessStatus,
        currentOpeningHours,
        userRatingCount,
        websiteUri,
        rating,
        latitude,
        longitude,
        isFavorite  
    } = props;

    const navigation = useNavigation();
    const { addToWishlist, removeFromWishlist } = useContext(WishlistContext);

    function toggleFavorite() {
        if (isFavorite) {
            removeFromWishlist(locationId);  
        } else {
            const favoriteData = {
                locationId,
                name: title,
                photo: imageUri,
                address,
                businessStatus,
                currentOpeningHours,
                userRatingCount,
                websiteUri,
                rating,
                latitude,
                longitude
            };
            addToWishlist(favoriteData);  
        }
    };

    function handlePress () {
        navigation.navigate('LocationDetails', { ...props, isFavorite });
    };

    const imageSource = imageUri ? { uri: imageUri } : placeholderImageUri;

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.cardContainer}>
                <ImageBackground
                    source={imageSource}
                    style={styles.ImageBackground}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.gradient}
                    >
                        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                            <FontAwesome
                                name={isFavorite ? 'star' : 'star-o'}  
                                size={18}
                                color="white"
                            />
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: windowWidth / 3 + 15,
        height: windowWidth / 3 + 15,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 20,
        marginHorizontal: 5,
    },
    ImageBackground: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    textContainer: {
        paddingHorizontal: 5,
        paddingBottom: 5,
    },
    title: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'figtree-bold',
    },
});
