import { View, StyleSheet } from "react-native";
import SearchBar from "../../components/SearchBar/SearchBar";


export default function Home(){
    return (
        <View style={styles.container}>
        <SearchBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 18
    }
});