import React from 'react';
import { View, StyleSheet, Modal, Image, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import { colors } from "../constants/Colors";
import { spacing } from "../constants/Spacing";

const VerFotoModal = ({modalVisible, setModalVisible, fotoSelecionada}) => {
  const windowWidth = Dimensions.get('window').width;
  
  return(
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[{flex: 'auto'}, styles.modalHeader]}>
            <AntDesign name="close" size={40} color={colors.white} onPress={() => setModalVisible(!modalVisible)}/>
          </View>
          <View style={[{flexGrow: 1}, styles.imageContainer]}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${fotoSelecionada}` }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    alignSelf: 'center',
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '90%',
    borderRadius: 20,
    paddingVertical: spacing.large,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row-reverse', 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: spacing.medium,
    paddingHorizontal: spacing.xlarge,
  },
  imageContainer: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullImage: {
    width: '95%',
    height: '95%',
  },
})

export default VerFotoModal