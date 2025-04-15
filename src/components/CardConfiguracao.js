import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'

const CardConfiguracao = ({onPress, nome, children, textStyle, containerStyle}) => {
  return(
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
      {children}
      <Text style={[styles.nomeConfig, textStyle]}>{nome}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.large,
    marginTop: spacing.small,
    marginBottom: spacing.large,
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