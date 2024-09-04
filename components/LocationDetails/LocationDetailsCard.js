import { View, Text, StyleSheet } from 'react-native';

export default function LocationDetailsCard({ title, address, businessStatus, currentOpeningHours, userRatingCount, websiteUri, rating }) {
    console.log(currentOpeningHours);
    return (
        <View style={styles.cardContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <View style={styles.underline}></View>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.cardAddress}>{address}</Text>
                <Text>{businessStatus}</Text>
                <Text>{currentOpeningHours.weekdayDescriptions}</Text>
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
    cardAddress: {
        marginTop: 5,
        fontSize: 16,
        color: 'gray',
    },
    underline: {
        backgroundColor: '#E5E4E2',
        height: 3,
        width: '100%'
    }
});
