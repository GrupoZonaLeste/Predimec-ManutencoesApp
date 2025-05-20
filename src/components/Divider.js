import {View, Text, StyleSheet} from 'react-native'
import { colors } from '../constants/Colors'
import { spacing } from '../constants/Spacing'

const Divider = ({margin}) => {
  const propStyle = {
    marginVertical: margin ? margin : spacing.medium
  }

  return <View style={[styles.divider, propStyle]}></View>
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.darkGray
  }
})

export default Divider