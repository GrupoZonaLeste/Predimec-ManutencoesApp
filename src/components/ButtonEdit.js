import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../constants/Colors'
import { spacing } from '../constants/Spacing';

const ButtonEdit = ({isSelected, onPress}) => {
  const selectedContainerStyle = isSelected ? 
    {backgroundColor: colors.yellow, borderRadius: "50%"} : 
    {backgroundColor: 'transparent'} 

	return(
		<TouchableOpacity style={[styles.btnContainer, selectedContainerStyle]} onPress={onPress}>
			<Ionicons 
        name="create-sharp" 
        size={isSelected ? 20 : 40} 
        color={colors.black}
      />
		</TouchableOpacity>
	)
	
}

const styles = StyleSheet.create({
  btnContainer: {
    height: 40,
    width: 40,
    marginVertical: spacing.large,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ButtonEdit