// Import de React Native
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

// Import de Firebase
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage } from '../config/firebase';
import { db } from '../config/firebase';

// Import de Redux
import { useSelector, useDispatch } from 'react-redux';
import { setPesquisaId, clearPesquisaId } from '../../redux/pesquisaSlice';

// Import de Componentes
import Header from '../../src/components/Header';
import Botao  from '../../src/components/ColorButton';



const NovaPesquisa = (props) => {

  // Redux e Navigation
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.login.email);

  // Configuração de useState
  const [name, setName]  = useState('');
  const [day,  setDay ]  = useState('');
  const [url,  setUrl ]  = useState('');

  const [txtValNome, setValNome] = useState('');
  const [txtValData, setValData] = useState('');
  const [txtValImagem, setValImagem] = useState('')

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageName, setImageName] = useState('')

  

  const salvaDados = () => {
    setValNome('');
    setValData('');
    setValImagem('');

    if (name !== '' && day !== '' && url !== '') {
      adicionarPesquisa();
      
    } else {
      if ( name === '' ) setValNome('Preencha o nome da pesquisa');
      if ( day  === '' ) setValData('Preencha a data');
      if ( url  === '' ) setValImagem('Insira uma imagem');
    }
  };

  const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const escolherFoto = () => {
    launchImageLibrary()
      .then((result) => {
        setUrl(result.assets[0].uri); // Recebe o endereço da imagem
        setImageName(makeId(5));
      })
      .catch((err) => {
        console.log('\n\nErro ao abrir a câmera -> ' + JSON.stringify(err));
      });
  };

  const adicionarPesquisa = async () => {
    const imageRef = ref(storage, `${email}/${imageName}`)
    const file = await fetch(url)
    const blob = await file.blob()

    uploadBytes(imageRef, blob, { contentType: 'image/jpeg' })
      .then((doc) => {
        console.log("\n\nImagem enviada: " + JSON.stringify(doc))
        getDownloadURL(imageRef)
          .then((url) => {
            console.log("\n\nURL da imagem -> " + JSON.stringify(url))
            const dadosPesquisa = {
              nome: name,
              data: day,
              linkImagem: url,
              excelente: 0,
              bom: 0,
              neutro: 0,
              ruim: 0,
              pessimo: 0,
              nomeImagem: imageName
            }
            const collectionPesquisa = collection(db, email)//cria collection com o nome da pesquisa
            addDoc(collectionPesquisa, dadosPesquisa)
              .then((doc) => {
                console.log("\n\nCriação de pesquisa bem sucedida: " + JSON.stringify(doc))
                dispatch(setPesquisaId(doc.id)); // Salva o ID da pesquisa no Redux
                console.log('ID DA PESQUISA SALVO: ' + doc.id)
                setUrl('')
                props.navigation.navigate('Home')
              })
              .catch((err) => {
                console.log("\n\nErro na criação de pesquisa: " + JSON.stringify(err))
              })
          })
          .catch((err) => {
            console.log("\n\nErro ao pegar URL -> " + JSON.stringify(err))
          })
      })
      .catch((err) => {
        console.log("\n\nErro ao enviar imagem: " + JSON.stringify(err))
      })
  }

  useEffect(() => {
    return () => {
      dispatch(clearPesquisaId()); // Limpa o ID da pesquisa do Redux ao sair da tela
      console.log('ID da pesquisa removido')
    };
  }, [dispatch]);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'dd/MM/yyyy', { locale: ptBR });
      setDay(formattedDate);
    }
  };


// =================================================================================
//                                     ELEMENTS
// =================================================================================
  return (

    <View style={styles.view}>

      <View style={styles.header} >
        <Header header_title="Nova Pesquisa" navigation={navigation} />
      </View>

      <View style={styles.viewPrincipal}>

        <View style={styles.cInputs}>

          <View>
            <Text style={styles.texto}>Nome:</Text>
            <TextInput style={styles.textInput} value={name} onChangeText={setName} />
            <Text style={styles.textoVal}>{txtValNome}</Text>
          </View>

          <View>
            <View style={styles.cData}>
              <View style={styles.dataInput}>
                <Text style={styles.texto}>Data:</Text>
                <TextInput
                  style={styles.textInput}
                  value={day}
                  onFocus={() => setShowDatePicker(true)}
                  showSoftInputOnFocus={false} //desabilita o teclado ao focar no TextInput
                />
              </View>

              <TouchableOpacity style={styles.calendario} onPress={() => setShowDatePicker(true)}>
                <Icon name="calendar-month" size={33.9} color="grey" />
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={onChangeDate}
                locale="pt-BR" //define a localização para português do Brasil
              />
            )}

            <Text style={styles.textoVal}>{txtValData}</Text>
          </View>

          <View style={styles.containerImagem}>
            <Text style={styles.texto}>Imagem:</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity onPress={() => { escolherFoto() }}>
                <View style={styles.imagem}>
                  {
                    url ?

                      <Image source={{ uri: url }} style={{ width: '100%', height: '100%' }} />
                      :
                      <Text style={styles.textoImagem}>Galeria de imagens</Text>
                  }
                </View>
              </TouchableOpacity>
              <Text style={styles.textoVal}>{txtValImagem}</Text>
            </View>
          </View>
        </View>

        <Botao texto="CADASTRAR" funcao={salvaDados} />

      </View>

    </View>
  )
}


// =================================================================================
//                                     STYLES
// =================================================================================
const styles = StyleSheet.create({

  view: {
    flex: 1,
  },

  header: {
    flex: 0.15,
  },

  viewPrincipal: {
    backgroundColor: '#372775',
    flex: 0.85,
    paddingVertical: '2%',
    paddingHorizontal: '15%',
    justifyContent: 'space-between',
  },

  cInputs: {
    flex: 0.95,
    justifyContent: 'space-evenly'
  },

  cData: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: '-1%'
  },

  dataInput: {
    flex: 0.999999
  },

  calendario: {
    backgroundColor: 'white'
  },

  imagem: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: '85%',
    width: 137
  },

  textInput: {
    fontSize: 14,
    backgroundColor: 'white',
    height: 35.3,
    justifyContent: 'center',
    color: 'black',
    fontFamily: 'AveriaLibre-Regular'
  },

  texto: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'AveriaLibre-Regular'
  },

  textoImagem: {
    fontSize: 18,
    color: 'grey',
    fontFamily: 'AveriaLibre-Regular'
  },

  textoVal: {
    fontSize: 18,
    color: '#fd7979',
    fontFamily: 'AveriaLibre-Regular'
  },

  containerImagem: {
    flex: 0.9,
    marginTop: '-1%'
  }

})

export default NovaPesquisa