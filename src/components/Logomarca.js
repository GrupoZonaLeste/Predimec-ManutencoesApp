import {View, Image, StyleSheet} from 'react-native'
import { spacing } from '../constants/Spacing'

const Logomarca = () => {
  return(
    <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Image style={styles.logo} source={require('../../assets/logo/logo-basica.png')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 1100 / 7,
    height: 200 / 7,
    marginVertical: spacing.large
  },
})

export default Logomarca