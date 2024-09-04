import { View, StyleSheet, ImageBackground, Text, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../../components/BackButton';
import LocationDetailsCard from '../../components/LocationDetails/LocationDetailsCard';

export default function LocationDetails({ route }) {
    const title = route.params.title;
    const imageUri = route.params.imageUri;
    const address = route.params.address;

    return (
        <View style={styles.screenContainer}>
            <ImageBackground
                source={{ uri: imageUri }}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.backButtonContainer}>
                    <BackButton />
                </SafeAreaView>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>
            <LocationDetailsCard title={title} address={address}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    imageBackground: {
        width: '100%',
        height: 350,
        justifyContent: 'flex-end',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 50,
        left: 18,
        zIndex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    textContainer: {
        paddingHorizontal: 10,
        paddingBottom: 30,
    },
    title: {
        fontSize: 25,
        color: 'white',
        fontFamily: 'figtree-bold',
    },
    
});
