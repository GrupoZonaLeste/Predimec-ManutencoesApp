import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'
/** 
 * 
 */
const CardCliente = ({nome, onPress}) => {
  return(
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialIcons style={styles.icone} name="factory" size={30} color="black" />
      <Text style={styles.nomeCliente}>{nome}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1.5,
    borderTopColor: colors.gray,
    borderBottomColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '98%',
    flexDirection: 'row',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.large
  },
  icone: {
    flex: 'auto',
  },
  nomeCliente: {
    flexGrow: 0.95,
    fontFamily: 'Inter-Medium',
    fontSize: fontSizes.small,
  }
})

export default CardCliente;