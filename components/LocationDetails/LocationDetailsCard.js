import { View, Text, StyleSheet } from 'react-native';
import DetailsContainer from './DetailsContainer';

export default function LocationDetailsCard({ title, address, businessStatus, currentOpeningHours, userRatingCount, websiteUri, rating }) {
    const openingHours = currentOpeningHours.weekdayDescriptions;
    return (
        <View style={styles.cardContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <View style={styles.underline}></View>
            </View>
            <View style={styles.detailsContainer}>
                <DetailsContainer icon='address'>
                    <Text style={styles.text}>{address}</Text>
                </DetailsContainer>
                {/* <Text>{businessStatus}</Text> */}
                <DetailsContainer icon='calendar'>
                    <View style={{ flexDirection: 'column' }}>
                        {openingHours.map((entry, index) => (
                            <Text key={index} style={[styles.text, { paddingVertical: 5 }]}>{entry}</Text>
                        ))}
                    </View>
                </DetailsContainer>

                <Text>{userRatingCount}</Text>
                <Text>{websiteUri}</Text>
                <Text>{rating}</Text>
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
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 20
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
