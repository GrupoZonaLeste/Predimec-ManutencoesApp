import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'

const CardSmallManutencao = ({cliente, funcionario, data, onPress}) => {
  
  return(
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Text numberOfLines={1} style={styles.textCliente}>{cliente}</Text>
      <Text numberOfLines={1} style={styles.textFuncionario}>{funcionario}</Text>
      <Text numberOfLines={1} style={styles.textData}>{data}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'stretch',
    maxWidth: '30%',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
    elevation: 10,
    paddingHorizontal: spacing.large,
    marginHorizontal: spacing.medium,
    alignItems: 'baseline',
    justifyContent: 'center',
    overflow: 'hidden',
    flexWrap: 'nowrap',
    backgroundColor: colors.white,
  },
  textCliente: {
    fontFamily: "Inter-SemiBold",
    fontSize: fontSizes.xsmall,
  },
  textFuncionario: {
    fontFamily: "Inter-Regular",
    fontSize: fontSizes.xsmall,
  },
  textData: {
    fontFamily: "Inter-Regular",
    fontSize: fontSizes.xsmall,
  }
})

export default CardSmallManutencao