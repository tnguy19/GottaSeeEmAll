import { View, StyleSheet, Text } from "react-native";
import Button from "../SearchBar/Button";

export default function OverviewSection({ title, children }) {
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 20
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'figtree-bold',
        fontSize: 20
    },

});