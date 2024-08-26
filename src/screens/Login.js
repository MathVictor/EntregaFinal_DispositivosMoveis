//Import de React Native
import {View, Pressable, TextInput, Text, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import de Redux
import {useDispatch} from 'react-redux';
import {reducerSetLogin} from '../../redux/loginSlice';

// Import de Firebase
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase.js';



export default function Login(props){

  // Configurar useState
  const [email, setEmail]         = useState('matias@matias.net');
  const [password, setPassword]   = useState('123123');
  const [aviso, setInputError]         = useState('');
  const [isLoading, setisLoading] = useState(false);

  // Definir navegação
  const goNovaConta =      () => { props.navigation.navigate('CriarConta')};
  const goRecuperarSenha = () => { props.navigation.navigate('RecuperarSenha')};
  const goHome =           () => { props.navigation.navigate('Home')};

  // Regex para teste Email
  const emailRegex = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/;

  
  const verifyData = () => {


    // Filtrar se não for Email

    if (emailRegex.test(email) == false && password == '') {
      setInputError('E-mail e senha inválidos.');
      return;

    } else if (password == '') {
      setInputError('Senha inválida.');
      return;

    } else if (emailRegex.test(email) == false) {
      setInputError('E-mail inválido.');
      return;
    }



    // Verificação de Regex

    setisLoading(true);
    setInputError(' ');

    let regEmail = email;
    let regPassword = password;

    // Firebase Auth
    signInWithEmailAndPassword(auth, email, password)


    .then(doc => {

      console.log(JSON.stringify(doc.user));

      // Carregar Email em Redux
      dispatch(reducerSetLogin({email: email}));

      // Limpar useState
      setEmail('');
      setPassword('');
      goHome();

    })


    .catch(err => {

      console.log(JSON.stringify(err.code));

      // Retornar erro
      if (err.code == 'auth/wrong-password') setInputError('E-mail ou senha inválidos');
      if (err.code != 'auth/wrong-password') setInputError('Usuário não encontrado');

    })

    .finally(() => {
      setisLoading(false);
    });
    
  };

  const dispatch = useDispatch();



// =================================================================================
//                                   ELEMENTS
// =================================================================================
  return (

    <View style={styles.Container}>

      <View style={styles.ViewTitle}>
        <Text style={styles.TitleText}>Satisfying.you</Text>
        <Icon name="smile-o" size={50} color="#FFFFFF"></Icon>
      </View>

      <View style={styles.containerLogin}>

        <View style={styles.textBox}>
          <Text style={styles.text}>E-mail</Text>
          <TextInput
            style={styles.textInput}
            placeholder="jurandir.pereira@hotmail.com"
            placeholderTextColor="#3F92C5"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.text}>Senha</Text>
          <TextInput
            style={styles.textInput}
            placeholder="*********"
            placeholderTextColor="#3F92C5"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.warning}>{aviso}</Text>
        </View>

        <View style={styles.containerEntrar}>
          {!isLoading ? (
            <Pressable style={styles.btnLogin} onPress={verifyData}>
              <Text Text style={styles.text} onPress={verifyData}>
                Entrar
              </Text>
            </Pressable>
          ):(
            <Pressable style={styles.btnLogin} disabled={true}>
              <ActivityIndicator
                style={{alignSelf: 'center', marginTop: '3%'}}
                color="white"
                size={18}
              />
              <Text
                Text
                style={styles.text}
                onPress={() => {
                  verifyData();
                }}>
                {/*Autenticando*/}
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.containerBtn}>

        <View style={styles.btnBox}>
          <Pressable style={styles.btnRegister} onPress={goNovaConta}>
            <Text style={styles.text}>Criar minha conta</Text>
          </Pressable>
        </View>

        <View style={styles.btnBox}>
          <Pressable style={styles.btnPassword} onPress={goRecuperarSenha}>
            <Text style={styles.text}>Esqueci minha senha</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
};


// =================================================================================
//                                   STYLES
// =================================================================================
const styles = StyleSheet.create({

  Container: {
    backgroundColor: '#372775',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '1%',
  },

  ViewTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 0.2,
    paddingBottom: '2%',
  },

  TitleText: {
    fontSize: 40,
    color: '#FFFFFF',
    fontFamily: 'AveriaLibre-Regular',
    paddingRight: '5%',
  },

  containerLogin: {
    display: 'flex',
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },

  containerBtn: {
    display: 'flex',
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '20%',
    marginTop: '3%',
  },

  btnBox: {
    display: 'flex',
    flex: 0.5,
    width: '80%',
  },

  textBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '80%',
    flex: 0.5,
    marginBottom: '1%',
  },

  text: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'AveriaLibre-Regular',
  },

  warning: {
    color: '#FD7979',
    fontSize: 10,
    fontFamily: 'AveriaLibre-Regular',
  },

  containerEntrar: {
    display: 'flex',
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  textInput: {
    fontSize: 16,
    backgroundColor: 'white',
    width: '100%',
    fontFamily: 'AveriaLibre-Regular',
    height: '62.5%',
    color: '#3F92C5',
  },

  btnLogin: {
    fontSize: 28,
    display: 'flex',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#37BD6D',
    width: '80%',
    height: '70%',
  },

  btnRegister: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    backgroundColor: '#419ED7',
    width: '100%',
    height: '80%',
  },

  btnPassword: {
    color: '#FFFFFF',
    backgroundColor: '#B0CCDE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '80%',
  },
});

