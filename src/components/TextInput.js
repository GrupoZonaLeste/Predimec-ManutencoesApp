import { View, StyleSheet, TextInput as Input} from 'react-native'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const TextInput = ({placeholder, onChangeText, style, containerStyle, value, defaultValue, password = false}) => {

  return(
    <View style={[{justifyContent: 'center'},containerStyle]}>
      <Input 
        secureTextEntry={password}
        placeholder={placeholder} 
        style={[styles.textInput, style]} 
        placeholderTextColor={colors.darkGray} 
        value={value}
        onChangeText={onChangeText}
        defaultValue={defaultValue}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    alignSelf: 'stretch',
    backgroundColor: colors.gray,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: spacing.large,
    fontSize: fontSizes.small,
  }
})

export default TextInput