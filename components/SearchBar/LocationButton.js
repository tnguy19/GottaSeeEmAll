import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LocationButton({city}){
    return (
        <TouchableOpacity style={styles.searchBarContainer}>
            <MaterialIcons name="my-location" size={17} color="black" />
            <Text style={styles.text}>{city}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        margin: 3
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'figtree-medium',
        color: 'black',
        marginLeft: 5
    }
});