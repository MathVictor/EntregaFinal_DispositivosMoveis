// Import de React Native
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Import de Firebase
import { updateDoc, deleteDoc, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';

// Import de Redux
import { useSelector, useDispatch } from 'react-redux';
import { setPesquisaId } from '../../redux/pesquisaSlice';

// Import de Componentes
import Popup from '../components/Popup';
import Header from '../components/Header';
import Botao from '../components/ColorButton';



export default function ModificarPesquisa(props){

  const [name, setName] = useState('');
  const [day, setDay] = useState('');

  const [txtName, setTxtName] = useState('');
  const [txtDay, setTxtDay] = useState('');
  const [txtImage, setTxtImage] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [linkImagem, setLinkImagem] = useState('');
  const [nomeFoto, setNomeFoto] = useState('');
  const [fotoAlterada, setFotoAlterada] = useState(false);
  const [imagemAnterior, setImagemAnterior] = useState('');

  const dispatch = useDispatch();

  const docId = useSelector((state) => state.pesquisa.docId);
  const email = useSelector((state) => state.login.email);

  const modificaDados = async () => {
    if (name !== '' && day !== '') {
      const docRef = doc(db, email, docId);
      if (fotoAlterada == true) {
        await uploadImagem(docRef)
      } else {
        await updateDoc(docRef, {
          nome: name,
          data: day,
          linkImagem: linkImagem,
          nomeImagem: nomeFoto
        });
      }

      props.navigation.pop();
    } else {
      if(name == '')
        setTxtName("Preencha o nome da pesquisa")
      
      if(day == '')
        setTxtDay("Preencha a data")

      if(linkImagem == '')
        setTxtImage("Insira uma imagem")
    }
  };

  const excluirPesquisa = async () => {
    try {
      const docRef = doc(db, email, docId);

      const pesquisaDoc = await getDoc(docRef);
      await deleteDoc(docRef);
      dispatch(setPesquisaId({docId: null}));

      props.navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao excluir pesquisa: ', error);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'dd/MM/yyyy', { locale: ptBR });
      setDay(formattedDate);
    }
  };

  const uploadImagem = async (docRef) => {
    const imageRef = ref(storage, `${email}/${nomeFoto}`)
    const file = await fetch(linkImagem)
    const blob = await file.blob()
    await uploadBytes(imageRef, blob, { contentType: 'image/jpeg' })
      .then((doc) => {
        console.log("\n\nImagem enviada: " + JSON.stringify(doc.ref))
        getDownloadURL(imageRef)
          .then((url) => {
            updateDoc(docRef,{
              nome: name,
              data: day,
              linkImagem: url,
              nomeImagem: nomeFoto
            })
          })
          .catch((err) => {
            console.log("\n\nProblema ao pegar o link: " + JSON.stringify(err))
          })
      })
      .catch((err) => {
        console.log("\n\nErro ao enviar imagem: " + JSON.stringify(err))
      })
    const imageRefAntiga = ref(storage, `${email}/${imagemAnterior}`)
    await deleteObject(imageRefAntiga)
      .then(() => {
        console.log("\n\nImagem anterior deletada")
      })
      .catch((err) => {
        console.log("\n\nErro ao deletar imagem: " + JSON.stringify(err))
      })
  }

  useEffect(() => {
    const pesquisaRef = doc(db, email, docId);
    const unsubscribe = onSnapshot(pesquisaRef, (snap) => {
      if(snap.exists()){
        setName(snap.data().nome)
        setDay(snap.data().data)
        setLinkImagem(snap.data().linkImagem)
        setImagemAnterior(snap.data().nomeImagem)
      }
    })
  }, [])

  const escolherFoto = () => {
    launchImageLibrary()
      .then((result) => {
        setLinkImagem(result.assets[0].uri)
        setNomeFoto(result.assets[0].fileName)
        setFotoAlterada(true)
      })
      .catch((err) => {
        console.log("\n\nErro ao abrir a camera -> " + JSON.stringify(err))
      })
  }


// =================================================================================
//                                     ELEMENTS
// =================================================================================
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Header header_title="Modificar Pesquisa" navigation={props.navigation} />
      </View>

      <View style={styles.viewPrincipal}>
        <View style={styles.cPrimario}>
          <View style={styles.cInputs}>
            <View>
              <Text style={styles.texto}>Nome:</Text>
              <TextInput style={styles.textInput} value={name} onChangeText={setName} />
              <Text style={styles.textoVal}>{txtName}</Text>
            </View>

            <View>
              <View style={styles.cData}>
                <View style={styles.dataInput}>
                  <Text style={styles.texto}>Data:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={day}
                    onFocus={() => setShowDatePicker(true)}
                    showSoftInputOnFocus={false}
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
                  locale="pt-BR"
                />
              )}
            </View>

            <View style={styles.containerImagem}>
              <Text style={styles.texto}>Imagem:</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity onPress={() => { escolherFoto() }} style={styles.imagem}>
                  {
                    linkImagem ?
                      <Image source={{ uri: linkImagem }} style={{ width: '100%', height: '100%', alignSelf: 'center' }} />
                      :
                      null
                  }
                </TouchableOpacity>
                <Text style={styles.textoVal}>{txtImage}</Text>
              </View>
            </View>
            <Popup
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              onConfirm={()=>excluirPesquisa()}
            />
          </View>

          <Botao text="MODIFICAR" fcn={()=>{modificaDados()}} />
          
        </View>

        <View style={styles.BotaoDeletar}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="trash-can-outline" size={50} color="white" />
            <Text style={styles.texto}>Apagar</Text>
          </TouchableOpacity>
        </View>

      </View>
      <Popup 
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible} 
      navigation={props.navigation}
      onConfirm={() => excluirPesquisa()} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2%'
  },

  cPrimario: {
    flex: 0.9,
    paddingLeft: '15%',
    justifyContent: 'space-between',
  },

  cInputs: {
    flex: 0.95,
    justifyContent: 'space-evenly',
  },

  cData: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  dataInput: {
    flex: 0.999999,
  },

  calendario: {
    backgroundColor: 'white'
  },

  imagem: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    height: '90%',
    width: 137
  },

  textInput: {
    fontSize: 14,
    backgroundColor: 'white',
    height: 35.3,
    color: 'black',
    fontFamily: 'AveriaLibre-Regular',
  },

  BotaoDeletar: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '2%'
  },

  texto: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'AveriaLibre-Regular'
  },
  
  textoVal: {
    fontSize: 18,
    color: '#fd7979',
    fontFamily: 'AveriaLibre-Regular'
  },

  containerImagem: {
    flex: 0.9,
    paddingBottom: '4%',
  }

})
