import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function HeaderButton({ title, icon, isActive, onPress}) {
    return (
        <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={onPress}
        >
            <View style={styles.content}>
                <FontAwesome name={icon} color='black' size={21} />
                <Text style={styles.text}>{title}</Text>
            </View>
            {isActive && <View style={styles.underline}></View>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    },
    text: {
        fontSize: 21,
        lineHeight: 20,
        paddingTop: 3.9,
        paddingLeft: 4,
        fontFamily: 'figtree-medium'
    },
    underline: {
        backgroundColor: 'black',
        height: 4,
        width: '100%'
    }
});