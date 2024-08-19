import { View, StyleSheet } from "react-native";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import HomeHeader from "../../components/HomeHeader/HomeHeader";

export default function Home({navigation}){
    const [currentView, setCurrentView] = useState('Overview');

    function toggleView(view) {
        setCurrentView(view);
    }

    useEffect(() => {
        // Update the custom header to receive the toggleView function
        navigation.setOptions({
            header: () => <HomeHeader onPress={toggleView} />,
        });
    }, [currentView]);

    if (currentView === 'Map'){
        return (
            <></>
        )
    }

    return (
        <View style={styles.container}>
        <SearchBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 18
    }
});