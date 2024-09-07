import { View, StyleSheet, ImageBackground, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../../components/BackButton';
import LocationDetailsCard from '../../components/LocationDetails/LocationDetailsCard';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function LocationDetails({ route }) {
    const {
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
    } = route.params;

    const [currentFavorite, setCurrentIsFavorite] = useState(isFavorite);

    function toggleFavorite(){
        setCurrentIsFavorite(prevState => !prevState);
    }

    return (
        <View style={styles.screenContainer}>
            <ImageBackground
                source={{ uri: imageUri }}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.headerContainer}>
                    <BackButton />
                    <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                        <FontAwesome 
                            name={currentFavorite ? 'star' : 'star-o'} 
                            size={28} 
                            color="white" 
                        />
                    </TouchableOpacity>
                </SafeAreaView>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>
            <View style={styles.detailsCardContainer}>
                <LocationDetailsCard 
                    title={title} 
                    address={address}
                    businessStatus={businessStatus}
                    currentOpeningHours={currentOpeningHours}
                    userRatingCount={userRatingCount}
                    rating={rating}
                    websiteUri={websiteUri}
                    latitude={latitude}
                    longitude={longitude}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageBackground: {
        width: '100%',
        height: 350,
        justifyContent: 'flex-end',
    },
    headerContainer: {
        position: 'absolute',
        top: 50,
        left: 18,
        right: 18,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',  
        alignItems: 'center', 
    },
    favoriteButton: {
        right: 0,
        paddingHorizontal: 10,
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    textContainer: {
        paddingHorizontal: 10,
        paddingBottom: 30,
    },
    title: {
        fontSize: 25,
        color: 'white',
        fontFamily: 'figtree-bold',
    },
    detailsCardContainer: {
        flex: 1, 
        paddingTop: -20, 
        paddingHorizontal: 18,
        marginTop: -20,  
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
});
