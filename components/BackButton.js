import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {

    const navigation = useNavigation();

    function handlePress(){
        navigation.goBack();
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlePress} style={styles.touchable}>
                <AntDesign name="arrowleft" size={23} color="black" style={styles.arrow} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        position: 'absolute',
    },
    arrow: {
        
    },
});
