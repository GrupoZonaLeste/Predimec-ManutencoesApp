import { TouchableOpacity, View, Text, StyleSheet} from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const CardManutencao = ({nome, onPress}) => {
  return(
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons name="hammer-screwdriver" size={30} color="black" />
      <Text style={styles.nomeManutencao}>{nome}</Text>
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
  nomeManutencao: {
    flexGrow: 0.95,
    fontFamily: 'Inter-Medium',
    fontSize: fontSizes.small,
  }
})

export default CardManutencao