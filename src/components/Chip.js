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
        <Text style={[styles.readOnlyText]}>{"\u2022  "+children}</Text>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    justifyContent: 'flex-start',
    paddingHorizontal: spacing.large,
    margin: spacing.small,
  },
  text: {
    width: '85%',
    fontFamily: 'Inter-Regular',
  },
  readOnlyText: {
    width: 'auto',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSizes.small
  },
  icon: {
    marginRight: spacing.medium,
  }
})

export default Chip