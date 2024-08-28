import { ScrollView, StyleSheet, View } from "react-native";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect, useContext } from "react";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import OverviewSection from "../../components/Section/OverviewSection";
import CardCarousel from "../../components/Section/CardCarousel";
import Map from "../../components/MapView/Map";
import { LocationContext } from "../../context/LocationContext";
import { getCity, searchNearby } from "../../utils/apiFunctions";

export default function Home({ navigation }) {
    const [currentView, setCurrentView] = useState('Overview');

    const { location } = useContext(LocationContext);

    const [currentCity, setCurrentCity] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        async function fetchCity() {
            if (location && location.coords) {
                const city = await getCity(location.coords.latitude, location.coords.longitude);
                setCurrentCity(city);
            }
        }

        async function getNearby() {
            try {
                await searchNearby(location.coords.latitude, location.coords.longitude);
                setDataLoaded(true);
            } catch (error) {
                console.log(`Unable to load data for Home screen: ${error}`);
            }
        }

        fetchCity();
        getNearby();

    }, [location, dataLoaded]);

    function toggleView(view) {
        setCurrentView(view);
    }

    useEffect(() => {
        navigation.setOptions({
            header: () => <HomeHeader onPress={toggleView} />,
        });
    }, [currentView]);

    if (currentView === 'Map') {
        return (
            <Map />
        )
    }

    function searchHandler() {
        navigation.navigate('Search', {
            currentCity: currentCity
        });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <SearchBar onPress={searchHandler} currentLocation={currentCity} />
                <OverviewSection title='Local Suggestions'>
                    {dataLoaded && <CardCarousel />}
                </OverviewSection>
                <OverviewSection title='Recently Visited'>
                    {dataLoaded && <CardCarousel />}
                </OverviewSection>
                <OverviewSection title='Wishlist'>
                    {dataLoaded && <CardCarousel />}
                </OverviewSection>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 18
    },
    content: {
        paddingBottom: 50
    }
});