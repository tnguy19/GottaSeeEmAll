import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function DiscoverHeader(){
    return (
        <SafeAreaView style={styles.headerContainer}>
            <Text style={styles.text}>Discover</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: 20
    },
    text: {
        fontFamily: 'figtree-bold',
        fontSize: 30
    }
});