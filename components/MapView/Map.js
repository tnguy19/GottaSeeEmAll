import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import { Marker } from "react-native-maps";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LocationContext } from "../../context/LocationContext";

export default function Map({customLatitude, customLongitude, locationName}) {
    // console.log('customLatitude', customLatitude);
    // console.log('customLongitude', customLongitude);
    // console.log('location Name', locationName);
    const {location} = useContext(LocationContext);

    return (
        <View>
            {
                location && (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: customLatitude ? customLatitude : location.coords.latitude,
                            longitude: customLongitude ? customLongitude : location.coords.longitude,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03,
                        }}
                    >
                        <Marker 
                            coordinate={{latitude:  customLatitude ? customLatitude : location.coords.latitude, longitude : customLongitude ? customLongitude : location.coords.longitude}}
                            title={locationName ? locationName : 'Your current location'}
                        />
                        {/* {
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
                        } */}

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