import { View, StyleSheet } from "react-native";
import OverviewSection from "../../components/Section/OverviewSection";
import PlaceList from "../../components/PlaceList";
import CardCarousel from "../../components/Section/CardCarousel";
import { useContext, useEffect, useState } from "react";
import { LandmarkContext } from "../../context/LandmarkContext";
import { WishlistContext } from "../../context/WishlistContext";
export default function Discover() {

    const { landmarks } = useContext(LandmarkContext);
    const [dataLoaded, setDataLoaded] = useState(false);
    const { isFavorite } = useContext(WishlistContext); 

    useEffect(() => {
        if (landmarks && landmarks.length > 0) {
            console.log(`Landmarks updated: ${landmarks}`)
            setDataLoaded(true);
        }
    }, [landmarks]);

    return (
        <View style={styles.container}>
            <OverviewSection title='Your next destination'>
                {dataLoaded && <CardCarousel landmarks={landmarks} isFavorite={isFavorite} />}
            </OverviewSection>
            <OverviewSection title='Top Rated'>
                {dataLoaded && <CardCarousel landmarks={landmarks} isFavorite={isFavorite}/>}
            </OverviewSection>
            <OverviewSection title='Blogs'>
                {dataLoaded && <CardCarousel landmarks={landmarks} isFavorite={isFavorite}/>}
            </OverviewSection>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 10
    },
    carouselCustomStyle: {
        marginTop: -10,
    }
});