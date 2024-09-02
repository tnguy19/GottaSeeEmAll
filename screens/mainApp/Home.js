import React, { useState, useEffect, useContext, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SearchBar from '../../components/SearchBar/SearchBar';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import OverviewSection from '../../components/Section/OverviewSection';
import CardCarousel from '../../components/Section/CardCarousel';
import Map from '../../components/MapView/Map';
import { LocationContext } from '../../context/LocationContext';
import { getCity, getNearbyLandmarks, getLocationPhoto } from '../../utils/apiFunctions';
import { LandmarkContext } from '../../context/LandmarkContext';

export default function Home({ navigation }) {
    const [currentView, setCurrentView] = useState('Overview');
    const { location } = useContext(LocationContext);
    const {landmarks} = useContext(LandmarkContext); 
    const [currentCity, setCurrentCity] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        async function fetchCity() {
            if (location && location.coords) {
                const city = await getCity(location.coords.latitude, location.coords.longitude);
                setCurrentCity(city);
            }
        }

        fetchCity();
    }, [location]);

    useEffect(() => {
        if (landmarks && landmarks.length > 0) {
            console.log(`Landmarks updated: ${landmarks}`)
            setDataLoaded(true);
        } 
    }, [landmarks]);

    useEffect(() => {
        navigation.setOptions({
            header: () => <HomeHeader onPress={toggleView} />,
        });
    }, [currentView]);

    function toggleView(view) {
        setCurrentView(view);
    }

    function searchHandler() {
        navigation.navigate('Search', {
            currentCity: currentCity
        });
    }

    if (currentView === 'Map') {
        return (
            <Map />
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <SearchBar onPress={searchHandler} currentLocation={currentCity} />
                <OverviewSection title='Local Suggestions'>
                    {dataLoaded && <CardCarousel landmarks={landmarks}/>}
                </OverviewSection>
                <OverviewSection title='Recently Visited'>
                    {dataLoaded && <CardCarousel landmarks={landmarks}/>}
                </OverviewSection>
                <OverviewSection title='Wishlist'>
                    {dataLoaded && <CardCarousel landmarks={landmarks} />}
                </OverviewSection>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 18
    },
    content: {
        paddingBottom: 50
    }
});
