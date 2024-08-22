import { View, StyleSheet } from "react-native";
import OverviewSection from "../../components/Section/OverviewSection";
import PlaceList from "../../components/PlaceList";
import CardCarousel from "../../components/Section/CardCarousel";

export default function Discover() {
    return (
        <View style={styles.container}>
            <OverviewSection title='Your next destination'>
                <CardCarousel customStyle={styles.carouselCustomStyle} />
            </OverviewSection>
            <OverviewSection title='Top Rated'>
                <CardCarousel customStyle={styles.carouselCustomStyle} />
            </OverviewSection>
            <OverviewSection title='Blogs'>
                <CardCarousel customStyle={styles.carouselCustomStyle} />
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