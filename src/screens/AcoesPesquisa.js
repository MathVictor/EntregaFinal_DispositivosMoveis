// Import de React Native
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

// Import de Redux
import { useSelector } from 'react-redux';

// Import de Componentes
import Header from '../components/Header';



export default function AcoesPesquisa(props) {
  const navigation = useNavigation()
  const id = useSelector((state) => state.pesquisa.docId)
  console.log("\nAcões pesquisa: " + id)


// =================================================================================
//                                   ELEMENTS
// =================================================================================
  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Header header_title="Pesquisa" navigation={props.navigation} />
      </View>


      <View style={styles.containerCards}>
        <TouchableOpacity onPress={() => navigation.navigate('ModificarPesquisa')}>
          <View style={styles.card}>
            <Image
              source={require('../../assets/imgs/modificar.png')}
              style={styles.image} />
            <Text style={styles.textoCard}>  Modificar  </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Coleta')}>
          <View style={styles.card}>
            <Image
              source={require('../../assets/imgs/coletar.png')}
              style={styles.image}
            />
            <Text style={styles.textoCard}>Coletar Dados</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Relatorio')}>
          <View style={styles.card}>
            <Image
              source={require('../../assets/imgs/relatorio.png')}
              style={styles.image}
            />
            <Text style={styles.textoCard}>  Relatório  </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


// =================================================================================
//                                     STYLES
// =================================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#372775',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  containerCards: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: '6%',
    width: '100%'
  },
  card: {
    width: '90%',
    height: '80%',
    backgroundColor: '#312464',
    borderRadius: 6,
    marginHorizontal: '4%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    height: '40%',
    width: '40%',
    marginBottom: '10%'
  },
  textoCard: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'AveriaLibre-Regular'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  }
});