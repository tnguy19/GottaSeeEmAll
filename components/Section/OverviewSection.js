import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Button from "../SearchBar/Button";

export default function OverviewSection({ title, children }) {
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity>
                    <Text style={styles.optionText}>See All</Text>
                </TouchableOpacity>
            </View>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 20,
        marginBottom: 5
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'figtree-bold',
        fontSize: 20
    },
    optionText: {
        fontFamily: 'figtree-regular',
        fontSize: 15,
        paddingTop: 2,
        paddingRight: 5
    }
});