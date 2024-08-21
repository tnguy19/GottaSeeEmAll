import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function SeeAllHeader({ title }) {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.content}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={23} color="black" style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        marginLeft: 25,
        marginBottom: 10,
        
    },
    arrow: {
        marginTop: 7
    },
    title: {
        fontSize: 27,
        fontFamily: 'figtree-bold',
        marginLeft: 30,
        
    },

});