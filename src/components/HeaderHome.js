import {View, StyleSheet, Text, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setPesquisaId } from "../../redux/pesquisaSlice";
import { reducerSetLogin } from "../../redux/loginSlice";


export default function HeaderHome(){
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const exit = () => {
        // Limpar Redux
        dispatch(reducerSetLogin({email: null}));
        dispatch(setPesquisaId({docId: null}));
        
        // Voltar para Tela de Login
        navigation.navigate('Login');
    }
    return(
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerContainer} onPress={() => {exit()}}>
                <Text style={styles.Text}>Sair</Text>
            </TouchableOpacity>
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
        paddingLeft: '1%',
        paddingTop: '2%',
        paddingBottom: '2.5%',
    },

    Text:{
        marginLeft: 11,
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 20
    },
    
    headerContainer: {
        display: 'flex',
        height: '100%',
        alignItems: 'center'
    }
})

