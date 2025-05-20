import {View, Image, StyleSheet, Text, Alert, TouchableOpacity} from 'react-native'
import ButtonDelete from './ButtonDelete';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const CardFoto = ({id, foto, list, setList, onPress}) => {
  const deletarFoto = () => {
    let listaAtualizada = list.filter(item => item.id != id)
    setList(listaAtualizada)
  }

  const confirmarDelete = () => {
    Alert.alert(
      '',
      'Tem certeza que quer apagar essa foto?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deletarFoto()
          },
        },
      ],
      { cancelable: false }
    );
  }
  return(
    <View style={styles.linhaFoto}>
      <TouchableOpacity style={styles.viewFoto} onPress={onPress}>
        <Image 
          source={{ uri : `data:image/jpeg;base64,${foto}` }}
          style={styles.imageMiniatura}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewButton} onPress={confirmarDelete}>
        <ButtonDelete 
          size={30} 
          color={colors.white} 
          imageOnly/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  linhaFoto: {
    flex: 1,
    height: 'auto',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: 'space-between',
    padding: spacing.medium,
    marginVertical: spacing.small
  },
  imageMiniatura: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.black
  },
  viewFoto: {
    flex: 0.85, 
    height: 150, 
    backgroundColor: colors.black,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewButton:{
    flex: 0.12, 
    height: 150, 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red
  }
})

export default CardFoto