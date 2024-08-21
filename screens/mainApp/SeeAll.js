import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import SeeAllHeader from "../../components/HomeHeader/SeeAllHeader";
import SearchBar from "../../components/SearchBar/SearchBar";
import PlaceList from "../../components/PlaceList";

export default function SeeAll({ route }) {
    const title = route.params.title;
    return (
        <SafeAreaView>
            <View>
                <SeeAllHeader title={title} />
                <View style={styles.contentContainer}>
                   <SearchBar hideHistoryTab={true}/>
                </View>
                <PlaceList/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 18
    }
});