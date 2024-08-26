import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import AcoesPesquisa from './src/screens/AcoesPesquisa';
import Agradecimento from "./src/screens/AgradecimentoParticipacao";
import Coleta from "./src/screens/Coleta";
import Relatorio from "./src/screens/Relatorio";
import Login from "./src/screens/Login";
import RecuperarSenha from "./src/screens/RecuperarSenha";
import CriarConta from "./src/screens/CriarConta";
import ModificarPesquisa from './src/screens/ModificarPesquisa'
import NovaPesquisa from './src/screens/NovaPesquisa'
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Stack = createStackNavigator();

export default function App(){
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='CriarConta' component={CriarConta}/>
          <Stack.Screen name='RecuperarSenha' component={RecuperarSenha}/>
          <Stack.Screen name='NovaPesquisa' component={NovaPesquisa}/>
          <Stack.Screen name="Coleta" component={Coleta}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="AgradecimentoParticipacao" component={Agradecimento}/>
          <Stack.Screen name="Relatorio" component={Relatorio}/>
          <Stack.Screen name="AcoesPesquisa" component={AcoesPesquisa}/>
          <Stack.Screen name="ModificarPesquisa" component={ModificarPesquisa}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
