import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { spacing } from '../constants/Spacing';
import { colors } from '../constants/Colors'

const ButtonDelete = ({onPress}) => {
	return(
		<TouchableOpacity style={styles.btnContainer} onPress={onPress}>
			<Ionicons name="trash-sharp" size={40} color={colors.red} />
		</TouchableOpacity>
	)
	
}

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: spacing.large,
    width: 'auto',
  }
})

export default ButtonDelete