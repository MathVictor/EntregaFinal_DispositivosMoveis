// Import de React Native
import { TouchableOpacity, Text, StyleSheet } from "react-native";


export default function ColorButton (props) {

    const text = props.text;
    const fcn = props.fcn;

    return (
        <TouchableOpacity style={styles.btn} onPress={props.fcn}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    btn: {
        backgroundColor: '#49B976',
        height: '12%',
        justifyContent: 'center'
    },
    text: {
        fontSize: 25,
        color: 'white',
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'center',
    }


})
