import { View, ImageBackground, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { getLocationPhoto } from "../../utils/apiFunctions";

const windowWidth = Dimensions.get('window').width;
const placeholderImageUri = require('../../assets/locationImages/test1.jpg');

export default function PlaceCard({ locationId, title }) {
    //console.log(imageUris);

    const [imageUris, setImageUris] = useState();
    const  [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        async function fetchImage() {
            try {
                const imagesList = await getLocationPhoto(locationId);
                //console.log(imagesList)
                setImageUris(imagesList ? imagesList : [placeholderImageUri]);
                setImagesLoaded(true);
            } catch (error) {
                console.error('Failed to fetch image:', error);
                setImageUris([placeholderImageUri]); 
            }
        }

        fetchImage();
    }, [locationId]);

    console.log(imageUris);

    const imageUri = imagesLoaded && imageUris.length > 0 ? { uri: imageUris[0].imageUrl } : placeholderImageUri;

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
                        {/* <Text style={styles.location}>{location}</Text> */}
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
        marginTop: 20,
        marginHorizontal: 5,
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