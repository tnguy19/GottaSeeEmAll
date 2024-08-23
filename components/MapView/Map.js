import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import { Marker } from "react-native-maps";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LocationContext } from "../../context/LocationContext";

export default function Map() {

    const {location} = useContext(LocationContext);

    const placeholderCoords = [
        { latitude: 37.7749, longitude: -122.4194 },
        { latitude: 39, longitude: -125 },
        { latitude: 47, longitude: -125 },
    ];

    return (
        <View>
            {
                location && (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.07,
                            longitudeDelta: 0.07,
                        }}
                    >
                        {
                            placeholderCoords && (
                                placeholderCoords.map((marker, index) => (
                                    <TouchableOpacity key={index}>
                                        <Marker
                                            coordinate={marker}
                                        >
                                            <MaterialCommunityIcons name="marker-check" size={30} color="#FF3131" />
                                        </Marker>
                                    </TouchableOpacity>

                                ))
                            )
                        }

                    </MapView>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    }
});