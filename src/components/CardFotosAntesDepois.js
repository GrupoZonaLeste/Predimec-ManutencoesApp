import {View, Image, StyleSheet, Text, Touchable, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const CardFotosAntesDepois = ({id, fotoAntes, legendaAntes, fotoDepois, legendaDepois, list, setList, isEditable = false, onPress}) => {
  const handleDelete = () => {
    setList(list.filter(item => item.id != id))
  }

  if(!isEditable){
    return(
      <TouchableOpacity style={styles.linhaFoto} onPress={onPress}>
        <View style={{flex: 0.45, justifyContent: 'center'}}>
          <Text style={styles.label}>Antes</Text>
          <Image 
            source={{ uri : `data:image/jpeg;base64,${fotoAntes}`}}
            style={styles.imageMiniatura} 
          />
          <Text numberOfLines={2} style={styles.legenda}>{legendaAntes}</Text>
        </View>
  
        <View style={{flex: 0.45}}>
          <Text style={styles.label}>Depois</Text>
          <Image 
            source={{ uri : `data:image/jpeg;base64,${fotoDepois}`}}
            style={styles.imageMiniatura} 
          />
          <Text numberOfLines={2} style={styles.legenda}>{legendaDepois}</Text>
        </View>
      </TouchableOpacity>
    )
  } else {
    return(
      <TouchableOpacity style={styles.linhaFoto} onPress={onPress}>
        <View style={{flex: 0.40, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.label}>Antes</Text>
          <Image 
            source={{ uri : `data:image/jpeg;base64,${fotoAntes}`}}
            style={styles.imageMiniaturaEdit} 
          />
          <Text numberOfLines={2} style={styles.legenda}>{legendaAntes}</Text>
        </View>
  
        <View style={{flex: 0.40, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.label}>Depois</Text>
          <Image 
            source={{ uri : `data:image/jpeg;base64,${fotoDepois}`}}
            style={styles.imageMiniaturaEdit} 
          />
          <Text numberOfLines={2} style={styles.legenda}>{legendaDepois}</Text>
        </View>

        <TouchableOpacity style={styles.botaoDeletar} onPress={handleDelete}>
          <Ionicons name="trash-sharp" size={30} color={colors.white} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
  
}

const styles = StyleSheet.create({
  linhaFoto: {
    flex: 1,
    height: 'auto',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: 'space-between',
    padding: spacing.medium,
    marginVertical: spacing.small
  },
  label: {
    fontSize: 12,
    textAlign: 'center'
  },
  imageMiniatura: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    overflow: 'hidden',
    resizeMode: 'stretch',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.black
  },
  imageMiniaturaEdit: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    overflow: 'hidden',
    resizeMode: 'stretch',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.black
  },
  botaoDeletar: {
    alignSelf: 'center',
    flex: 'auto',
    borderRadius: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red
  }
})

export default CardFotosAntesDepois