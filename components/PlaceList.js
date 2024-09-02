import { View, FlatList, StyleSheet } from "react-native";
import { placeholders } from "../data/placeholders/places";
import PlaceCard from "./Section/PlaceCard";

export default function PlaceList({ landmarks }) {
    function renderItem({ item }) {
        return (
            <PlaceCard
                locationId={item.api_id}
                title={item.name}
                address={item.address}
                imageUri={item.photo}
            />
        )
    }
    
    return (
        <View style={styles.container}>
            <FlatList
                data={landmarks}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                style={styles.flatList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    flatList: {
      flex: 1
    }
});