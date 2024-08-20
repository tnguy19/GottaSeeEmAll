import { View, ImageBackground, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PlaceCard({ imageUri, title, location }) {
    return (
        <TouchableOpacity>
            <View style={styles.cardContainer}>
                <ImageBackground
                    source={imageUri}
                    style={styles.ImageBackground}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.gradient}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.location}>{location}</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: windowWidth / 3 + 15,
        height: windowWidth / 3 + 15,
        borderRadius: 10,
        overflow: 'hidden',
        margin: 5,
    },
    ImageBackground: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    textContainer: {
        paddingHorizontal: 5,
        paddingBottom: 5,
    },
    title: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'figtree-bold'
    },
    location: {
        fontSize: 10,
        color: 'white',
        fontFamily: 'figtree-medium'
    },
});