import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function HistoryTab({name, city}) {
    return (
        <TouchableOpacity style={styles.container}>
            <FontAwesome name="clock-o" size={24} color="black" />
            <View style={styles.detailContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.city}>{city}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 10,
    },
    detailContainer: {
        justifyContent: 'flex-start',
        marginLeft: 20
    },
    name: {
        fontFamily: 'figtree-bold',
    },
    city: {
        fontFamily: 'figtree-regular',
        fontSize: 12,
    }
});