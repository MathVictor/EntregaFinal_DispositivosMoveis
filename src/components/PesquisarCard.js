// Import de React Native
import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Import de Redux
import { useDispatch } from 'react-redux'
import { setPesquisaId } from '../../redux/pesquisaSlice'



export default function PesquisarCard(props) {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [idPesquisa, setIdPesquisa] = useState(props.id)

  
  const goToAcoes = () => {
    dispatch(setPesquisaId({docId: idPesquisa}))
    navigation.navigate('AcoesPesquisa')
  }



// =================================================================================
//                                   ELEMENTS
// =================================================================================
 
  return (

    <TouchableOpacity onPress={() => {
      
      goToAcoes()
      }}>
      <View style={styles.card}>
        <Image source={{uri: props.urlImagem}} style={styles.image} />
        <Text style={styles.tituloCard}>{props.nome}</Text>
        <Text style={styles.textoData}>{props.data}</Text>
      </View>
    </TouchableOpacity>
    

  )
}

// =================================================================================
//                                   STYLES
// =================================================================================

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 170,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40
  },
  image: {
    height: '45%',
    width: '40%',
    marginBottom: 8,
  },
  tituloCard: {
    fontSize: 24,
    color: '#3F92C5',
    fontFamily: 'AveriaLibre-Regular'
  },
  textoData: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 13
  },
})