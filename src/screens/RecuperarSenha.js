// Import de React Native
import { View, Pressable, TextInput, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

// Import de Firebase
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../config/firebase"

// Import de Componentes
import Header from '../components/Header';




const RecuperarSenha = (props) => {

  const regexEmail = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.-]+.[a-z]{2,}$/;

  // Configurar useState
  const [ email, setEmail ]     = useState('');
  const [ warning, setWarning ] = useState('');

  const verifica = () => {

    if (regexEmail.test(email) == true) {
      let regEmail = email;
      console.log(regEmail);
      setWarning(' ');
      

      // Procedimento de Reset de Senha
      sendPasswordResetEmail(auth, email)

      .then((doc) => {
        console.log("Sucesso ao recuperar senha")
        props.navigation.pop();
      })

      .catch((err) => {
        console.log("Erro ao recuperar senha: " + JSON.stringify(err.code))
        if (err.code == 'auth/user-not-found') {
          setWarning('Usuário não encontrado')
        }
      })

    } else {

      setWarning('E-mail parece ser inválido');
    }
  };


// =================================================================================
//                                     ELEMENTS
// =================================================================================

  return (
    <View style={styles.tela}>
      <View style={styles.headerContainer}>
        <Header header_title="Recuperação de senha" navigation={props.navigation} />
      </View>
      <View style={styles.containerEmail}>
        <View style={styles.caixaDeTexto}>
          <Text style={styles.texto}>E-mail</Text>
          <TextInput
            style={styles.textInput}
            placeholder="jurandir.pereira@hotmail.com"
            placeholderTextColor="#3F92C5"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.warning}>{warning}</Text>
        </View>
      </View>
      <View style={styles.containerEntrar}>
        <Pressable style={styles.botaoEntrar}>
          <Text style={styles.texto} onPress={verifica}>
            RECUPERAR
          </Text>
        </Pressable>
      </View>
    </View>
  );
};


// =================================================================================
//                                     STYLES
// =================================================================================

const styles = StyleSheet.create({
  tela: {
    backgroundColor: '#372775',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 0.37,
  },
  containerEmail: {
    display: 'flex',
    flex: 0.35,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  containerBtn: {
    display: 'flex',
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20%',
    marginTop: '3%',
  },
  caixaDeTexto: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '80%',
    flex: 0.5,
    marginBottom: '1%',
  },
  texto: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'AveriaLibre-Regular',
  },
  warning: {
    color: '#FD7979',
    fontSize: 10,
    fontFamily: 'AveriaLibre-Regular'
  },
  containerEntrar: {
    display: 'flex',
    flex: 0.2,
    margin: '2.25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textInput: {
    fontSize: 16,
    backgroundColor: 'white',
    width: '100%',
    fontFamily: 'AveriaLibre-Regular',
    height: '70%',
  },
  botaoEntrar: {
    fontSize: 28,
    display: 'flex',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#37BD6D',
    width: '80%',
    height: '70%',
  },
});

export default RecuperarSenha;
