import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as Linking from 'expo-linking';

export default function WebButtton({websiteUri}) {

    function handlePress(){
        Linking.openURL(websiteUri)
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <Text style={styles.text}>Book tickets!</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        marginHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 10
    },
    text: {
        fontFamily: 'figtree-bold',
        color: 'white'
    }
});