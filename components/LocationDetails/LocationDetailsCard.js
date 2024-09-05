import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DetailsContainer from './DetailsContainer';
import { FontAwesome } from '@expo/vector-icons';
import NavigateButton from './NavigateButton';


export default function LocationDetailsCard({ title, address, businessStatus, currentOpeningHours, userRatingCount, websiteUri, rating, latitude, longitude }) {
    const openingHours = currentOpeningHours ? currentOpeningHours.weekdayDescriptions : ['Available every day'];

    function renderStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesome
                    key={i}
                    name={i <= rating ? "star" : "star-o"}
                    size={25}
                    color="black"
                    style={styles.starIcon}
                />
            );
        }
        return stars;
    }
    //extract only the street from full retrieved address
    function formatAddress(address) {
        const parts = address.split(',');
        return parts[0];
    }

    return (
        <ScrollView style={styles.cardContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.ratingContainer}>
                    {renderStars(Math.round(rating))}
                   { userRatingCount && <Text style={styles.userRatingCount}>({userRatingCount.toLocaleString()})</Text>}
                </View>

                <View style={styles.underline}></View>
            </View>
            <View style={styles.detailsContainer}>
                <DetailsContainer icon='address'>
                    <Text style={styles.text}>{formatAddress(address)}</Text>
                </DetailsContainer>
                <DetailsContainer icon='calendar'>
                    <View style={{ flexDirection: 'column' }}>
                        {openingHours.map((entry, index) => (
                            <Text key={index} style={[styles.text, { paddingBottom: 5 }]}>{entry}</Text>
                        ))}
                    </View>
                </DetailsContainer>


                <NavigateButton websiteUri={websiteUri} title='Book tickets!'/>
                <NavigateButton 
                title='Show on Map'
                customButtonStyles={styles.customNavigationButton}
                customTextStyles={styles.customNavigationButtontext} 
                mapButton={true}
                latitude={latitude}
                longitude={longitude}
                />
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        backgroundColor: 'white',
        borderRadius: 30,
        flex: 1,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    detailsContainer: {
        paddingTop: 5
    },
    userRatingCount: {
        fontSize: 16,
        marginVertical: 6,
        marginLeft: 5,
        fontFamily: 'figtree-regular'
    },
    ratingContainer: {
        flexDirection: 'row',
        marginVertical: 20
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'figtree-regular',
        marginTop: 5,
        marginLeft: 15
    },
    underline: {
        backgroundColor: '#E5E4E2',
        height: 3,
        width: '100%'
    },
    customNavigationButton: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
    },
    customNavigationButtontext: {
        color: 'black',
    }
});
