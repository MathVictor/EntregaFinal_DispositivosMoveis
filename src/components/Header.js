import {View, StyleSheet, Text, TouchableOpacity} from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Header(props){
    const go_back = () => {
        props.navigation.pop();
    }
    return(
        <View style={styles.header}>
            <TouchableOpacity onPress={() => {go_back()}}>
                <Icon name="arrow-back" size={40} color='#573FBA'/>
            </TouchableOpacity>
            <Text style={styles.header_title}>{props.header_title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header:{
        backgroundColor: '#2B1D62',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#2b1d62',
        paddingLeft: '1%'
    },
    header_title: {
        color: '#FFFFFF',
        fontFamily: 'AveriaLibre-Regular',
        marginLeft: 15,
        fontSize: 26
    }
})

