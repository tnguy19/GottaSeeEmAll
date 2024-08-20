import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from './Button';

export default function SearchBar() {
    return (
        <TouchableOpacity style={styles.searchBarContainer}>
            <View style={styles.content}>
                <View style={styles.placeholderContainer}>
                    <FontAwesome name="search" size={15} color="black" />
                    <Text style={styles.text}>Search Landmark</Text>
                </View>
                <Button city='Boston' name='my-location'/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    placeholderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'figtree-bold',
        color: '#36454F',
        marginLeft: 5,
        lineHeight: 20,
        fontSize: 18,
        paddingTop: 3
    }
});