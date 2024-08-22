import { ScrollView, StyleSheet, View } from "react-native";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import OverviewSection from "../../components/Section/OverviewSection";
import CardCarousel from "../../components/Section/CardCarousel";
import Map from "../../components/MapView/Map";

export default function Home({ navigation }) {
    const [currentView, setCurrentView] = useState('Overview');

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
            <Map/>
        )
    }

    function searchHandler(){
        navigation.navigate('Search');
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <SearchBar onPress={searchHandler} />
                <OverviewSection title='Local Suggestions'>
                    <CardCarousel />
                </OverviewSection>
                <OverviewSection title='Recently Visited'>
                    <CardCarousel />
                </OverviewSection>
                <OverviewSection title='Wishlist'>
                    <CardCarousel />
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