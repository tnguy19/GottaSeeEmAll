import { View, Text, StyleSheet } from 'react-native';
import DetailsContainer from './DetailsContainer';
import { FontAwesome } from '@expo/vector-icons';
import WebButtton from './WebButton';

export default function LocationDetailsCard({ title, address, businessStatus, currentOpeningHours, userRatingCount, websiteUri, rating }) {
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

    return (
        <View style={styles.cardContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.ratingContainer}>
                    {renderStars(rating)}
                    <Text style={styles.userRatingCount}>({userRatingCount.toLocaleString()})</Text>
                </View>

                <View style={styles.underline}></View>
            </View>
            <View style={styles.detailsContainer}>
                <DetailsContainer icon='address'>
                    <Text style={styles.text}>{address}</Text>
                </DetailsContainer>
                <DetailsContainer>

                </DetailsContainer>
                {/* <Text>{businessStatus}</Text> */}
                <DetailsContainer icon='calendar'>
                    <View style={{ flexDirection: 'column' }}>
                        {openingHours.map((entry, index) => (
                            <Text key={index} style={[styles.text, { paddingVertical: 5 }]}>{entry}</Text>
                        ))}
                    </View>
                </DetailsContainer>

                <WebButtton websiteUri={websiteUri}/>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        backgroundColor: 'white',
        borderRadius: 30
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',

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
        fontSize: 14,
        color: 'black',
        fontFamily: 'figtree-regular',
        marginTop: 2,
        marginLeft: 15
    },
    underline: {
        backgroundColor: '#E5E4E2',
        height: 3,
        width: '100%'
    }
});
