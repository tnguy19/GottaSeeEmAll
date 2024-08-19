import { View, StyleSheet } from "react-native";
import HeaderButton from "./HeaderButton";
import { SafeAreaView } from "react-native";
import { useState } from "react";

export default function HomeHeader(){

    const [activeButton, setActiveButton] = useState('Overview');

    return (
        <SafeAreaView>
        <View style={styles.headerContainer}>
            <HeaderButton 
                title='Overview' 
                icon='map-marker'
                isActive={activeButton === 'Overview'}
                onPress={() => setActiveButton('Overview')}
            />
            <HeaderButton 
                title='Map' 
                icon='map' 
                isActive={activeButton === 'Map'}
                onPress={() => setActiveButton('Map')}
            />
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});