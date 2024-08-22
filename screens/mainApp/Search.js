import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import SearchBar from "../../components/SearchBar/SearchBar";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FunctionalSearchBar from "../../components/SearchBar/FunctionalSearchBar";

export default function Search() {

    const placeholders = [
        {name: 'Old State House', rating: '5'},
        {name: 'Freedom Trail', rating: '4'},
        {name: "Martha's Vineyard", rating: '3'},
    ];

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View style={styles.container}>
            <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={23} color="black" style={styles.arrow} />
            </TouchableOpacity>
                <FunctionalSearchBar data={placeholders} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 10
    },
    backButtonContainer: {
        marginBottom: 20
    }
});