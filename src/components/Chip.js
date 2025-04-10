import {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const Chip = ({list, setList, children, readOnly = false, isSelected = false}) => {
  const [selected, setSelected] = useState(isSelected)

  const containerSelected = {
    backgroundColor: selected ? colors.yellow : colors.white,
  }
  
  const textSelected = {
    fontFamily: selected ? 'Inter-Medium' : 'Inter-Regular'
  }

  const toggleSelected = () => {
    setSelected(!selected)
  }

  const handleOnPress = (children) => {
    // state ainda não atualizou, então quando o botão é apertado ainda não houve a mudança
    let currentSelected = !selected

    if(currentSelected){
      setList([...list, children])
    } else {
      setList(list.filter(item => item != children))
    }

    toggleSelected()
  }

  if(!readOnly){
    return(
      <TouchableOpacity style={[styles.container, containerSelected]} onPress={() => handleOnPress(children)}>
        {selected && (
          <Ionicons style={styles.icon} name="checkmark-sharp" size={18} color="black" />
        )}
        <Text style={[styles.text, textSelected]}>{children}</Text>
      </TouchableOpacity>
    )
  } else {
    return(
      <View style={[styles.readOnlyContainer]}>
        <Text style={[styles.readOnlyText]}>{children}</Text>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 8,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
    margin: spacing.small,
    backgroundColor: colors.white
  },
  readOnlyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.large,
    margin: spacing.small,
  },
  text: {
    fontFamily: 'Inter-Regular',
  },
  readOnlyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSizes.small
  },
  icon: {
    marginRight: spacing.medium
  }
})

export default Chip