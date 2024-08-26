//Import de React Native
import { Image, StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { PieChart } from 'react-native-svg-charts';
import { State } from 'react-native-gesture-handler';

//Import de Firebase
import { doc, query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

// Import de Redux
import {useSelector} from 'react-redux';

// Import de Componentes
import Header from '../components/Header';
import GraphicSub from '../components/GraphicSub';



const App = props => {
  
  
  const loggedUser = useSelector(state => state.login.email);
  const docId = useSelector(state => state.pesquisa.docId);
  const [documento, setDocumento] = useState("")

  const ref = doc(db,loggedUser,docId)
  useEffect(()=>{
    const unsubscribe = onSnapshot(ref, (snap)=>{
      setDocumento(snap.data())
    })
  },[])

  const data = [
    { key: 1,
    value: documento.excelente,
    svg: {
      fill: '#F1CE7E'
    }},

    { key: 2,
    value: documento.bom,
    svg: {
      fill: '#6994FE'
    }},

    { key: 3,
    value: documento.neutro,
    svg: {
      fill: '#5FCDA4'
    }},

    { key: 4,
    value: documento.ruim,
    svg: {
      fill: '#EA7288'
    }},

    { key: 5,
    value: documento.pessimo,
    svg: {
      fill: '#53D8D8'
    }}

  ];


// =================================================================================
//                                     ELEMENTS
// =================================================================================

  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.header}>
        <Header header_title="Relatório" navigation={props.navigation} />
      </View>
      <View style={styles.containerPagina}>
        <View style={styles.graphContainer}>
          <View style={styles.imagem}>
            <PieChart
              style={{height: 200, width: 200}}
              outerRadius={'100%'}
              innerRadius={0}
              data={data}
            />
          </View>
        </View>
        <View style={styles.containerLegenda}>
          <GraphicSub textoLegenda="Excelente" cor="#F1CE7E" />
          <GraphicSub textoLegenda="Bom" cor="#6994FE" />
          <GraphicSub textoLegenda="Neutro" cor="#5FCDA4" />
          <GraphicSub textoLegenda="Ruim" cor="#EA7288" />
          <GraphicSub textoLegenda="Péssimo" cor="#53D8D8" />
        </View>
      </View>
    </View>
  );
};


// =================================================================================
//                                     STYLES
// =================================================================================

const styles = StyleSheet.create({
  containerPrincipal: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#372775',
  },
  header: {
    backgroundColor: '#372775',
    flex: 0.16,
    flexDirection: 'row',
  },
  containerPagina: {
    display: 'flex',
    flex: 0.84,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: '2%',
  },
  graphContainer: {
    display: 'flex',
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLegenda: {
    display: 'flex',
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingTop: '2%',
    paddingBottom: '4%',
    height: '80%',
    marginTop: '3%',
  },
  imagem: {
    display: 'flex',
    flex: 0.75,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
});

export default App;
