import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'

const CardConfiguracao = ({onPress, nome, children}) => {
  return(
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {children}
      <Text style={styles.nomeConfig}>{nome}</Text>
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
  nomeConfig: {
    flexGrow: 0.95,
    fontFamily: 'Inter-Medium',
    fontSize: fontSizes.small,
  }
})

export default CardConfiguracao