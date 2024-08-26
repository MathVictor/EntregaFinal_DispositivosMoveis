// Import de React Native
import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Popup ({ modalVisible, setModalVisible, onConfirm })  {

  const navigation = useNavigation();

  const btnAllow = () => {
    if (onConfirm) onConfirm();
    setModalVisible(false);
  };
  const btnReject = () => {setModalVisible(false)};


// =================================================================================
//                                   ELEMENTS
// =================================================================================
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >

      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Tem certeza de apagar essa pesquisa?</Text>
          <View style={styles.modalButtonsContainer}>

            <TouchableOpacity 
              style={styles.btnAllowStyle}
              onPress={btnAllow}>
              <Text style={styles.buttonText}>SIM</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.btnRejectStyle}
              onPress={btnReject}>
              <Text style={styles.buttonText}>CANCELAR</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  );
};


// =================================================================================
//                                      STYLES
// =================================================================================
const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2B1F5C',
    padding: 20,
    borderRadius: 2,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center', 
    flexWrap: 'wrap', 
    maxWidth: '40%', 
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },

  btnAllowStyle: {
    backgroundColor: '#FF8383',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 1,
    marginRight: 20,
    width: '80%',
    height: '100%',
  },
  btnRejectStyle: {
    backgroundColor: '#3F92C5',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 1,
    width: '80%',
    height: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
});