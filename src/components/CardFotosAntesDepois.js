import {View, Image, StyleSheet, Text} from 'react-native'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const CardFotosAntesDepois = ({fotoAntes, legendaAntes, fotoDepois, legendaDepois}) => {
  return(
    <View style={styles.linhaFoto}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  linhaFoto: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: 'space-between',
    padding: spacing.medium,
    marginVertical: spacing.small
  },
  imageMiniatura: {
    width: '100%',
    height: 100,
    overflow: 'hidden',
    resizeMode: 'stretch',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.black
  }
})

export default CardFotosAntesDepois