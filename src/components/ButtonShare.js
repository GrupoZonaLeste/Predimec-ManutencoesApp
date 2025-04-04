import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { spacing } from '../constants/Spacing';

const ButtonShare = ({onPress}) => {
	return(
		<TouchableOpacity style={styles.btnContainer} onPress={onPress}>
			<Ionicons name="share-social" size={40} color="black" />
		</TouchableOpacity>
	)
	
}

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: spacing.large,
    width: 'auto',
  }
})

export default ButtonShare