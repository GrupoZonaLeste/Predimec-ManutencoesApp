import {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const Chip = ({onPress, children, readOnly = false}) => {
  const [selected, setSelected] = useState(false)

  const containerSelected = {
    backgroundColor: selected ? colors.bronze : colors.white,
  }
  
  const textSelected = {
    fontFamily: selected ? 'Inter-Medium' : 'Inter-Regular'
  }

  const toggleSelected = () => {
    setSelected(!selected)
  }

  if(!readOnly){
    return(
      <TouchableOpacity style={[styles.container, containerSelected]} onPress={toggleSelected}>
        {selected && (
          <Ionicons style={styles.icon} name="checkmark-sharp" size={18} color="black" />
        )}
        <Text style={[styles.text, textSelected]}>{children}</Text>
      </TouchableOpacity>
    )
  } else {
    return(
      <View style={[styles.container]}>
        <Text style={[styles.text, textSelected]}>{children}</Text>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    fontFamily: 'Inter-Regular',
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 8,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
    margin: spacing.small,
    backgroundColor: colors.white
  },
  text: {
  },
  icon: {
    marginRight: spacing.medium
  }
})

export default Chip