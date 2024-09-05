import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as Linking from 'expo-linking';
import { useNavigation } from "@react-navigation/native";

export default function NavigateButton({websiteUri, customButtonStyles, customTextStyles, title, mapButton, latitude, longitude}) {
    const navigation = useNavigation();

    function handlePress(){
        if (mapButton){
            navigation.navigate('Home',{ latitude: latitude, longitude: longitude, title: title, showOnMap: true });
        } else {
            Linking.openURL(websiteUri)
        }
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.container, customButtonStyles]}>
                <Text style={[styles.text, customTextStyles]}>{title}</Text>
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
        marginHorizontal: 35,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10
    },
    text: {
        fontFamily: 'figtree-bold',
        color: 'white',
        fontSize: 16
    }
});