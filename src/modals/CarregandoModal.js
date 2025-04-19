import React from 'react'
import { View, Text, StyleSheet, Modal as ModalReact} from 'react-native'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";

const CarregandoModal = ({modalVisible, setModalVisible}) => {
  return(
    <ModalReact
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <Text style={styles.texto}>Carregando...</Text>
      </View>
    </ModalReact>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    alignSelf: 'center',
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSizes.large,
    color: colors.white
  }
})

export default CarregandoModal