import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { colors } from "../constants/Colors";
import { spacing } from "../constants/Spacing";

const ButtonAdd = ({onPress, style}) => {
  const propStyle = {
    ...style
  }

  return(
    <TouchableOpacity style={[styles.btnContainer, propStyle]} onPress={onPress}>
      <LinearGradient 
        style={styles.gradiant}
        colors={colors.gradiant} 
        start={{ x: 0.3, y: 0.2 }}
        end={{ x: 0.9, y: 0.8 }}
      > 
        <FontAwesome6 name="add" size={20} color="black" />
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 8,
  },
  gradiant: {
    padding: spacing.medium,
    borderRadius: 4,
  }
})

export default ButtonAdd