import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
export default function SearchResults({ name, rating }) {

    function renderStars(rating){
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesome
                    key={i}
                    name={i <= rating ? "star" : "star-o"}
                    size={16}
                    color="black"
                    style={styles.starIcon}
                />
            );
        }
        return stars;
    }

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.detailContainer}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.rating}>
                {renderStars(rating)}
                </View>
               
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center",
    },
    detailContainer: {
        justifyContent: 'flex-start',
        marginLeft: 20
    },
    name: {
        fontFamily: 'figtree-bold',
    },
    rating: {
        flexDirection: 'row',
        marginTop: 5
    }
});