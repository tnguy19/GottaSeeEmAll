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

export default function Home({ navigation, route }) {
    const [currentView, setCurrentView] = useState('Overview');
    const { location } = useContext(LocationContext);
    const {landmarks} = useContext(LandmarkContext); 
    const [currentCity, setCurrentCity] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);

    //console.log(landmarks)
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
        if (route.params?.showOnMap) {
            setCurrentView('Map');
        }
    }, [route.params]);

 
    useEffect(() => {
        if (landmarks && landmarks.length > 0) {
            console.log(`Landmarks updated: ${landmarks}`)
            setDataLoaded(true);
        } 
    }, [landmarks]);

    useEffect(() => {
        navigation.setOptions({
            header: () => <HomeHeader onPress={toggleView} currentView={currentView} />,
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
        //console.log(`${route.params.latitude}, ${route.params.longitude}`);
        return (
            <Map customLatitude={route.params.latitude} customLongitude={route.params.longitude} locationName={route.params.locationName} />
        );
    }

    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <SearchBar onPress={searchHandler} currentLocation={currentCity} />
                <OverviewSection title='Local Suggestions' landmarks={landmarks}>
                    {dataLoaded && <CardCarousel landmarks={landmarks}/>}
                </OverviewSection>
                <OverviewSection title='Recently Visited' landmarks={landmarks}>
                    {dataLoaded && <CardCarousel landmarks={landmarks}/>}
                </OverviewSection>
                <OverviewSection title='Wishlist' landmarks={landmarks}>
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
