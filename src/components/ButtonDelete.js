import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { spacing } from '../constants/Spacing';
import { colors } from '../constants/Colors'

const ButtonDelete = ({onPress, size = 40, color = colors.red, imageOnly = false ,containerStyle}) => {
	// imageOnly = (true) componente atua só como foto | (false) componente funciona como botao
  
  if(imageOnly){
    return(
      <View style={[styles.btnContainer, containerStyle]}>
        <Ionicons name="trash-sharp" size={size} color={color} />
      </View>
    )
  } else {
    return(
      <TouchableOpacity style={[styles.btnContainer, containerStyle]} onPress={onPress}>
        <Ionicons name="trash-sharp" size={size} color={color} />
      </TouchableOpacity>
    )
  }
  
	
}

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: spacing.large,
    width: 'auto',
  }
})

export default ButtonDelete