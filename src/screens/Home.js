// Import de React Native
import { View, TouchableOpacity, StyleSheet, Text, TextInput, FlatList } from 'react-native';
import { React, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import de Redux
import { useSelector, useDispatch} from 'react-redux';

// Import de Firebase
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

// Import de Componentes
import HeaderHome from '../components/HeaderHome'
import Popup  from '../components/Popup'
import PesquisarCard from '../components/PesquisarCard'



const Home = () => {

  const navigation = useNavigation();

  // Configuração de useState
  const [modalVisible, setModalVisible] = useState(false);
  const [pesquisa, setPesquisa] = useState('');

  // Carregar Redux
  const email = useSelector((state) => state.login.email);


  useEffect( () => {
    const queryPesquisa = query(collection(db, email))
    const unsubscribe = onSnapshot(queryPesquisa, (snap) => {
      const listaPesquisas = []
      snap.forEach( (doc) =>{
        listaPesquisas.push({
          id: doc.id,
          nome: doc.data().nome,
          data: doc.data().data,
          urlImagem: doc.data().linkImagem

        })
      })
      console.log("Valores: " + JSON.stringify(listaPesquisas))
      if((listaPesquisas != '') || (listaPesquisas != null) || (listaPesquisas != undefined)){
        setPesquisa(listaPesquisas)
      }
    })
  }, [])


// =================================================================================
//                                     ELEMENTS
// =================================================================================
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderHome/>
      </View>
      <View style={styles.searchBar}>
        <Icon name="search" size={30} color="gray"></Icon>
        <TextInput
          style={styles.input}
          placeholder="Insira o termo de busca..."
          placeholderTextColor= "#8B8B8B"
        />
      </View>

      {/* Cards */}
      
      {pesquisa.length === 0 ? (
        <Text style={styles.txtEmpty}>Não há pesquisas cadastradas</Text>
      ) : (
        <FlatList
        data={pesquisa} 
        renderItem={({item}) => <PesquisarCard id={item.id} nome={item.nome} data={item.data} urlImagem={item.urlImagem} />} 
        keyExtractor={(item) => item.id}
        horizontal = {true}/>
      )}
      <View style={{ width: '95%', marginBottom: 10, height: '18%', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NovaPesquisa')}
          style={styles.btn}
        >
          <Text style={styles.btnTxt}>NOVA PESQUISA</Text>
        </TouchableOpacity>
      </View>

      <Popup modalVisible={modalVisible} setModalVisible={setModalVisible} />

    </View>
  );
};



// =================================================================================
//                                      STYLES
// =================================================================================
const styles = StyleSheet.create({

  container: {
    display: 'flex',
    backgroundColor: '#372775',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '2%',
  },

  containerCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '2.5%'
  },

  searchBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 1,
    height: '12%',
    width: '95%',
    marginBottom: 10,
    paddingLeft: 10,
  },

  input: {
    flex: 1,
    paddingBottom: 7,
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 18,
    color: '#3F92C5',
  },

  txtEmpty: {
    flex: 1,
    paddingBottom: 7,
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 27,
    color: 'white',
    marginTop: '4.5%'
  },

  icon: {
    width: '20%',
    height: '20%',
    marginRight: 5,
  },

  header: {
    backgroundColor: '#372775',
    marginTop: -15,
    flexDirection: 'row',
  },

  btn: {
    backgroundColor: '#37BD6D',
    height: '75%'
  },

  btnTxt: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular',
    paddingTop: '0.5%'
  },
});

export default Home;
