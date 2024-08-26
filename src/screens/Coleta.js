// Import de React Native
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Import de Redux
import { useSelector } from 'react-redux';

// Import de Firebase
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';



export default function Coleta(props){

    const [documento, setDocumento] = useState({});

    const navigation = useNavigation();
    const goAgradecimentoParticipacao = () => {
        navigation.navigate('AgradecimentoParticipacao');
    }

    const exitScreen = () => {
        props.navigation.pop();
    }

    const email = useSelector((state)=>state.login.email);
    const docId = useSelector((state)=>state.pesquisa.docId);

    const ref = doc(db,email,docId);
    
    useEffect(()=>{const unsubscribe = onSnapshot(ref, (snap)=>{
        setDocumento(snap.data())
    })},[]);
    
    const add = async (reaction) =>{
        let atributo;
        switch (reaction) {
            case "sad":
                atributo = {pessimo: (documento.pessimo) + 1};
                break;
            case "dissatisfied":
                atributo = {ruim: (documento.ruim) + 1};
                break;
            case "neutral":
                atributo = {neutro: (documento.neutro) + 1};
                break;
            case "satisfied":
                atributo = {bom: (documento.bom) + 1};
                break;
            case "very_satisfied":
                atributo = {excelente: (documento.excelente) + 1};
                break;
        }
        await updateDoc(ref,atributo)
    };



// =================================================================================
//                                   ELEMENTS
// =================================================================================
    return(
        <View style={styles.View}>
            <Pressable style={styles.invisibleButton} onPress={()=>{exitScreen()}}/>
            <View style={styles.MainRateView}>
                <Text style={styles.QuestionText}>O que você achou do Carnaval 2024</Text>
                <View style={styles.RateView}>
                    <View style={styles.RateIconView}>
                        <TouchableOpacity onPress={ () => { add("sad"); goAgradecimentoParticipacao() }}>
                            <Image style={styles.RateIcon} source={require('../../assets/icons/sad.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.RateText}>Péssimo</Text>
                    </View>
                    <View style={styles.RateIconView}>
                        <TouchableOpacity onPress={ () => { add("dissatisfied"); goAgradecimentoParticipacao() } }>
                            <Image style={styles.RateIcon} source={require('../../assets/icons/dissatisfied.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.RateText}>Ruim</Text>
                    </View>
                    <View style={styles.RateIconView}>
                        <TouchableOpacity onPress={ () => { add("neutral"); goAgradecimentoParticipacao() } } >
                            <Image style={styles.RateIcon} source={require('../../assets/icons/neutral.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.RateText}>Neutro</Text>
                    </View>
                    <View style={styles.RateIconView}>
                        <TouchableOpacity onPress={() => { add("satisfied"); goAgradecimentoParticipacao() }}>
                            <Image style={styles.RateIcon} source={require('../../assets/icons/satisfied.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.RateText}>Bom</Text>
                    </View>
                    <View style={styles.RateIconView}>
                        <TouchableOpacity onPress={() => { add("very_satisfied"); goAgradecimentoParticipacao() }}>
                            <Image style={styles.RateIcon} source={require('../../assets/icons/very_satisfied.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.RateText}>Excelente</Text>
                    </View>
                  
                </View>
            </View>
        </View>
    );
}


// =================================================================================
//                                      STYLES
// =================================================================================
const styles = StyleSheet.create({
    View:{
        flex: 1,
        backgroundColor: '#372775',
        justifyContent: 'center',
    },
    QuestionText: {
        color: '#ffffff',
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: '10%'
    },
    RateIcon: {
        height: Dimensions.get('screen').height * 0.25,
        width: Dimensions.get('screen').height * 0.25
    },
    RateView: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: '8%',
        marginBottom: '5%'
    },
    RateIconView:{
        marginRight: '8%',
        alignItems: 'center'
    },
    MainRateView: {
        alignItems: 'center'
    },
    RateText: {
        color: '#ffffff',
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 20,
        marginTop: '5%'

    },
    invisibleButton: {
            display: 'flex',
            alignSelf: 'flex-end',
            backgroundColor: '#372775',
            width: Dimensions.get('screen').width * 0.03,
            height: Dimensions.get('screen').width * 0.03,
            marginRight: '2%'
    }
});