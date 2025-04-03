import {View, Text, StyleSheet, Modal as ModalReact} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from './Button'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const Modal = ({modalVisible, setModalVisible, title, children}) => {
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
        <View style={styles.modalView}>
          <View style={[{flex: 'auto'}, styles.modalHeader]}>
            <Text style={styles.modalTitulo}>{title}</Text>
            <AntDesign name="close" size={40} color="black" onPress={() => setModalVisible(!modalVisible)}/>
          </View>

          {children}
        </View>
      </View>
    </ModalReact>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    alignSelf: 'center',
    width: "100%",
    height: "100%",
    backgroundColor: colors.transparentBlack,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    flex: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: spacing.large,
    paddingHorizontal: spacing.xlarge,
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
    flexDirection: 'row', 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: spacing.medium
  },
  modalTitulo: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.large,
  }
})

export default Modal