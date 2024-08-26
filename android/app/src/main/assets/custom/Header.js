import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'


const Header = (props) =>{
    return(
        <View style={styles.header}>
            <TouchableOpacity>
                <Icon name="arrow-back" size={40} color="#573fba"/>
            </TouchableOpacity>
            <Text style={styles.header_title}>{props.header_title}</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    header:{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#2b1d62',
        paddingLeft: '1%'
    },
    header_title:{
        fontSize: 24,
        color: 'white',
        marginLeft: '3%',
        fontFamily: 'AveriaLibre-Regular'
    },
})

export default Header

//Não esquecer de importar os icones e fontes pro projeto
/*Testei o header usando essa estrutura
        <View style={styles.container}>
            <View style={styles.header}>
            <Header header_title="Placeholder"/>
            </View>
        </View>
*/
/*container:{
        display: 'flex',
        backgroundColor: '#372775',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    header:{
        backgroundColor: '#372775',
        flex: 0.16,
        flexDirection: 'row',
    },
*/