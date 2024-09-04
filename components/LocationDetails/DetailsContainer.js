import { View, StyleSheet } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
export default function DetailsContainer({icon, children}){
    return (
        <View style={styles.container}>
            <Entypo name={icon} size={25} color="black" />
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginHorizontal: 18,
        paddingHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row'
    }
});