import { View, FlatList, StyleSheet } from "react-native";
import { placeholders } from "../data/placeholders/places";
import PlaceCard from "./Section/PlaceCard";

export default function PlaceList(){
    function renderItem({item}){
        return (
            <PlaceCard
            imageUri={item.imageUri}
            title={item.title}
            location={item.location}
        />
        )
    }
    return (
        <View style={styles.container}>
             <FlatList
                data={placeholders}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 15
    }
});