import { View, SafeAreaView, StyleSheet, ImageBackground, Text } from 'react-native';
import SeeAllHeader from '../../components/HomeHeader/SeeAllHeader';
import { LinearGradient } from 'expo-linear-gradient';

export default function LocationDetails({ route }) {
    const title = route.params.title;
    const imageUri = route.params.imageUri;
    const address = route.params.address;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.screenContainer}>
                <SeeAllHeader showTitle={false} />
                <View style={styles.cardContainer}>
                    <ImageBackground
                        source={{ uri: imageUri }}
                        style={styles.imageBackground}
                        resizeMode="cover"
                    >
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            style={styles.gradient}
                        >
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{title}</Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    screenContainer: {
        flex: 1,
        padding: 18,
    },
    cardContainer: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageBackground: {
        justifyContent: 'flex-end',
        width: '100%',
        height: 250,
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    textContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'figtree-bold',
    },
});
