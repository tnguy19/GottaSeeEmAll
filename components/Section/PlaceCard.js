import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet, Text, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get('window').width;
const placeholderImageUri = require('../../assets/locationImages/test1.jpg');

export default function PlaceCard({ locationId, title, imageUri, address }) {
    const [loading, setLoading] = useState(true);

    function loadingFinishHandler(){
        setLoading(false);
    }
    const imageSource = imageUri ? { uri: imageUri } : placeholderImageUri;
    //console.log(imageSource);
    return (
        <TouchableOpacity>
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
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
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
    textContainer: {
        paddingHorizontal: 5,
        paddingBottom: 5,
    },
    title: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'figtree-bold'
    },
    loadingIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }], // Adjust as needed
    },
});
