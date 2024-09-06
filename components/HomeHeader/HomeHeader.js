import { View, StyleSheet } from "react-native";
import HeaderButton from "./HeaderButton";
import { SafeAreaView } from "react-native";
import { useState } from "react";

export default function HomeHeader({onPress, currentView}){

    return (
        <SafeAreaView>
        <View style={styles.headerContainer}>
            <HeaderButton 
                title='Overview' 
                icon='map-marker'
                isActive={currentView === 'Overview'}
                onPress={() => { 
                    onPress('Overview')
                }}
            />
            <HeaderButton 
                title='Map' 
                icon='map' 
                isActive={currentView === 'Map'}
                onPress={() => {
                    onPress('Map')
                }}
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