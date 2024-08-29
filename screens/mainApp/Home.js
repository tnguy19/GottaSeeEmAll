import React, { useState, useEffect, useContext, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SearchBar from '../../components/SearchBar/SearchBar';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import OverviewSection from '../../components/Section/OverviewSection';
import CardCarousel from '../../components/Section/CardCarousel';
import Map from '../../components/MapView/Map';
import { LocationContext } from '../../context/LocationContext';
import { getCity, getNearbyLandmarks, getLocationPhoto } from '../../utils/apiFunctions';

export default function Home({ navigation }) {
    const [currentView, setCurrentView] = useState('Overview');
    const { location } = useContext(LocationContext);
    const [currentCity, setCurrentCity] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [landmarks, setLandmarks] = useState([]);
    const [storedLandmarkIDs, setStoredLandmarksID] = useState([]);
    const [landmarkPhotos, setLandmarkPhotos] = useState({});

    //cache to store device's current location
    const locationCache = useRef({});

    useEffect(() => {
        async function fetchCity() {
            if (location && location.coords) {
                const city = await getCity(location.coords.latitude, location.coords.longitude);
                setCurrentCity(city);
            }
        }

        async function getNearby() {
            if (location && location.coords) {
                const { latitude, longitude } = location.coords;
                const cacheKey = `${latitude},${longitude}`;

                if (locationCache.current[cacheKey]) {
                    // Use cached data if available
                    const cachedData = locationCache.current[cacheKey];
                    setLandmarks(cachedData.landmarks);
                    setStoredLandmarksID(cachedData.storedLandmarkIDs);
                    setLandmarkPhotos(cachedData.landmarkPhotos);
                    setDataLoaded(true);

                } else {
                    // Fetch new data
                    try {
                        const landmarks = await getNearbyLandmarks(latitude, longitude);
                        const landmarkData = [];
                        const photos = {};

                        for (let landmark of landmarks) {
                            const imageList = await getLocationPhoto(landmark.location_id);
                            landmarkData.push(landmark);
                            photos[landmark.location_id] = imageList.length > 0 ? imageList[0].imageUrl : null;
                        }

                        const cacheData = {
                            landmarks,
                            storedLandmarkIDs: landmarkData,
                            landmarkPhotos: photos
                        };
                        locationCache.current[cacheKey] = cacheData;

                        setLandmarks(landmarks);
                        setStoredLandmarksID(landmarkData);
                        setLandmarkPhotos(photos);
                        setDataLoaded(true);

                    } catch (error) {
                        console.log(`Unable to load data for Home screen: ${error}`);
                    }
                }
            }
        }

        fetchCity();
        getNearby();
    }, [location]);

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
                    {dataLoaded && <CardCarousel storedLandmarkIDs={storedLandmarkIDs} landmarkPhotos={landmarkPhotos} />}
                </OverviewSection>
                <OverviewSection title='Recently Visited'>
                    {dataLoaded && <CardCarousel storedLandmarkIDs={storedLandmarkIDs} landmarkPhotos={landmarkPhotos} />}
                </OverviewSection>
                <OverviewSection title='Wishlist'>
                    {dataLoaded && <CardCarousel storedLandmarkIDs={storedLandmarkIDs} landmarkPhotos={landmarkPhotos} />}
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
