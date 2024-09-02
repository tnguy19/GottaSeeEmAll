import {View, SafeAreaView, StyleSheet} from 'react-native';
import SeeAllHeader from '../../components/HomeHeader/SeeAllHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import PlaceList from '../../components/PlaceList';

export default function LocationDetails({route}){
    const title = route.params.title;
    const landmarks = route.params.landmarks;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.screenContainer}>
                <SeeAllHeader title={title}/>
                <View style={styles.placeListContainer}>
                    <PlaceList landmarks={landmarks} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    screenContainer: {
        flex: 1,
    },
    contentContainer: {
        padding: 18,
    },
    placeListContainer: {
        flex: 1, 
    },
});
