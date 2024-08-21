import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import SeeAllHeader from "../../components/HomeHeader/SeeAllHeader";

export default function SeeAll({route}) {
    const title = route.params.title;
    return (
        <SafeAreaView>
            <View>
                <SeeAllHeader title={title}/>
                <Text>This is the SeeAll screen</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

    }
});