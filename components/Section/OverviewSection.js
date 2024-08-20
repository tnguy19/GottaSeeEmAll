import { View, StyleSheet, Text} from "react-native";
import PlaceCard from "./PlaceCard";

export default function OverviewSection({title}){
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.title}>{title}</Text>
            <PlaceCard 
                title='Old State House' 
                location='Boston' 
                imageUri={require('../../assets/locationImages/test1.jpg')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 20
    },
    title: {
        fontFamily: 'figtree-bold',
        fontSize: 20
    },

});