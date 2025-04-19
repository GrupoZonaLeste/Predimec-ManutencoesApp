import {TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Button from './Button';
import database from '../mock/database.json'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const CardEquipamento = ({id, nome, criacao, onPress}) => {
  const handleLongPress = () => {
    Alert.alert("", `${nome}\n${criacao}`)
  }

  return(
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress} onPress={onPress}>

      <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>

        <View style={{flex: 'auto', alignItems: 'center'}}>
          <MaterialCommunityIcons name="engine" size={36} color="black" />
        </View>
        
        <View style={{width: '85%', alignItems: 'center'}}>
          <Text numberOfLines={1} style={styles.nomeEquipamento}>{nome}</Text>
          <Text numberOfLines={1} style={styles.dataCriacao}>{criacao}</Text>  
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: spacing.large,
    paddingHorizontal: spacing.large,
    marginVertical: spacing.medium,
  },
  linha: {
    flex: "auto", 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginVertical: spacing.small,
  },
  nomeEquipamento: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSizes.medium,
    alignSelf: 'baseline',
  },
  dataCriacao: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSizes.small,
    alignSelf: 'baseline',
  }
})

export default CardEquipamento