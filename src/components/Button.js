import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const Button = ({title = "btn", onPress, backgroundColor, color, containerStyle}) => {
  
  const colorPropStyle = {
    color: color ? color : colors.black
  }

  /* Pra mudar a cor do gradiant é necessário um vetor ['#000','#000'] */
  const bgColorPropStyle = () => {
    return backgroundColor ? [backgroundColor, backgroundColor] : colors.gradiant
  }

	return(
    <View style={[{alignItems: 'center', justifyContent: 'center'}, containerStyle]}>
      <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
        <LinearGradient 
          style={styles.gradiant}
          colors={bgColorPropStyle()} 
          start={{ x: 0.3, y: 0.2 }}
          end={{ x: 0.9, y: 0.8 }}
        >
            <Text style={[styles.btnTexto, colorPropStyle]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
	)
}

const styles = StyleSheet.create({
  btnContainer: {
    alignSelf: 'stretch',
    borderRadius: 8,
    height: 40,
  },
  gradiant: {
    alignSelf: 'stretch',
    borderRadius: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.large
  },
  btnTexto: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSizes.small
  }
})

export default Button