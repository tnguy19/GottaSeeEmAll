import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SearchBar from '../../components/SearchBar/SearchBar';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import OverviewSection from '../../components/Section/OverviewSection';
import CardCarousel from '../../components/Section/CardCarousel';
import Map from '../../components/MapView/Map';
import { LocationContext } from '../../context/LocationContext';
import { getCity } from '../../utils/apiFunctions';
import { LandmarkContext } from '../../context/LandmarkContext';
import { WishlistContext } from '../../context/WishlistContext';

export default function Home({ navigation, route }) {
    const [currentView, setCurrentView] = useState('Overview');
    const { location } = useContext(LocationContext);
    const { landmarks } = useContext(LandmarkContext);
    const { wishlist, isFavorite } = useContext(WishlistContext); 
    const [currentCity, setCurrentCity] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    console.log('Landmark 0:',landmarks[0]);
    console.log('Wishlist 0', wishlist[0]);
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
        if (route.params?.latitude && route.params?.longitude && route.params?.locationName) {
            return (
                <Map customLatitude={route.params.latitude} customLongitude={route.params.longitude} locationName={route.params.locationName} />
            );
        } else {
            return (
                <Map />
            );
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <SearchBar onPress={searchHandler} currentLocation={currentCity} />
                <OverviewSection title='Local Suggestions' landmarks={landmarks}>
                    {dataLoaded && <CardCarousel landmarks={landmarks} isFavorite={isFavorite} />}
                </OverviewSection>
                <OverviewSection title='Recently Visited' landmarks={landmarks}>
                    {dataLoaded && <CardCarousel landmarks={landmarks} isFavorite={isFavorite} />}
                </OverviewSection>
                <OverviewSection title='Wishlist' landmarks={wishlist}>
                    {dataLoaded && <CardCarousel landmarks={wishlist} isFavorite={isFavorite} wishList={true}/>}
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
