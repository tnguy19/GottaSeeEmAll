import React, { useEffect, useState, useContext } from 'react';
import { View, ImageBackground, StyleSheet, Text, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);
    const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

    useEffect(() => {
        loadFavoriteStatus();
    }, []);

    const loadFavoriteStatus = async () => {
        try {
            const savedFavorites = await AsyncStorage.getItem('favorites');
            if (savedFavorites) {
                const favoriteArray = JSON.parse(savedFavorites);
                const isFav = favoriteArray.some(fav => fav.locationId === locationId);
                setFavoriteStatus(isFav);
            }
        } catch (error) {
            console.error('Error loading favorite status:', error);
        }
    };

    const saveFavoriteStatus = async (newStatus) => {
        try {
            let updatedWishlist;
            if (newStatus) {
                const favoriteData = {
                    'locationId': locationId,
                    'name': title,
                    'photo': imageUri,
                    'address': address,
                    'businessStatus': businessStatus,
                    'currentOpeningHours': currentOpeningHours,
                    'userRatingCount': userRatingCount,
                    'websiteUri': websiteUri,
                    'rating': rating,
                    'latitude': latitude,
                    'longitude': longitude
                };
                updatedWishlist = [...wishlist, favoriteData];
                await addToWishlist(favoriteData);
            } else {
                updatedWishlist = wishlist.filter(fav => fav.locationId !== locationId);
                await removeFromWishlist(locationId); 
            }
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedWishlist));
        } catch (error) {
            console.error('Error saving favorite status:', error);
        }
    };

    const loadingFinishHandler = () => {
        setLoading(false);
    };

    const toggleFavorite = () => {
        const newFavoriteStatus = !favoriteStatus;
        setFavoriteStatus(newFavoriteStatus);
        saveFavoriteStatus(newFavoriteStatus);
    };

    const handlePress = () => {
        navigation.navigate('LocationDetails', { ...props, isFavorite: favoriteStatus });
    };

    const imageSource = imageUri ? { uri: imageUri } : placeholderImageUri;

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.cardContainer}>
                <ImageBackground
                    source={imageSource}
                    style={styles.ImageBackground}
                    resizeMode="cover"
                    onLoadEnd={loadingFinishHandler}
                >
                    {loading && (
                        <ActivityIndicator
                            size="large"
                            color="#ffffff"
                            style={styles.loadingIndicator}
                        />
                    )}
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.gradient}
                    >
                        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                            <FontAwesome
                                name={favoriteStatus ? 'star' : 'star-o'}
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
    loadingIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }],
    },
});
