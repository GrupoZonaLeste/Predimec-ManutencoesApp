import { View, Text, StyleSheet, TextInput as Input} from 'react-native'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const TextDisplay = ({containerStyle, style, children}) => {
  return(
    <View style={[styles.container, containerStyle]}>
      <Text selectable={true} style={[styles.textDisplay, style]}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'green',
    minHeight: 40,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  textDisplay: {
    alignSelf: 'stretch',
    paddingHorizontal: spacing.large,
    fontSize: fontSizes.small,
  }
})

export default TextDisplay