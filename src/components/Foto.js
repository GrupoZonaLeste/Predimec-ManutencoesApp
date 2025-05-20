import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'

const Fotos = ({source}) => {
  const placeholder = '../../assets/logo/logo-basica.png'

  return(
    <TouchableOpacity style={styles.container}>
      <Image style={styles.foto} source={require(placeholder)} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 'auto',
    height: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  foto: {
    width: 180,
    height: 100,
    overflow: 'hidden',
    resizeMode: 'stretch'
  }
})

export default Fotos