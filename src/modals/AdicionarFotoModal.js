import React, {useState} from 'react'
import { View, Text, StyleSheet, Alert, Image} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Modal from '../components/Modal'
import Divider from '../components/Divider'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";
import { getFotoTemplate } from '../mock/objectTemplates'

const AdicionarFotoModal = ({modalVisible, setModalVisible, list, setList}) => {
  /*
    fotoObj = {
      "fotoAntes": "",
      "legendaAntes": "",
      "fotoDepois": "",
      "legendaDepois": ""
    }
  */
  const [fotoObj, setFotoObj] = useState(getFotoTemplate())

  const escolherFoto = async (nomeFoto) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert("Permissão negada", "Precisamos de acesso à sua galeria para selecionar uma imagem.")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      base64: true
    })

    if (!result.canceled) {
      //setState(result.assets[0].base64)
      if(nomeFoto == "antes"){
        setFotoObj(obj => ({...obj, "fotoAntes": result.assets[0].base64}))
      }  
      if(nomeFoto == "depois"){
        setFotoObj(obj => ({...obj, "fotoDepois": result.assets[0].base64}))
      }
    } else {
      Alert.alert("Erro", "Você não escolheu uma foto")
    }
  }

  const enviarFotos = () => {
    setList([...list, fotoObj])
    Alert.alert("Sucesso", "Fotos adicionadas com sucesso!")
    setModalVisible(false)
    setFotoObj(getFotoTemplate())
  }
  
  return(
    <Modal title="Adicionar Foto" modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View style={{flexGrow: 1, width: '100%', alignItems: 'baseline', justifyContent: 'flex-start'}}>
        <Text style={styles.label}>Foto Antes</Text>

        <Image
          source={{ uri: `data:image/jpeg;base64,${fotoObj.fotoAntes}` }}
          style={styles.imagemMiniatura}
        />
        <Button 
          containerStyle={styles.button} 
          title="Escolher Foto" 
          onPress={() => escolherFoto("antes")}
        />
        <TextInput 
          containerStyle={styles.input} 
          placeholder="Digite a legenda..."
          onChangeText={(text) => setFotoObj(obj => ({...obj, "legendaAntes":text}))}
        />
        <Divider/>
        <Text style={styles.label}>Foto Depois</Text>
   
        <Image
          source={{ uri: `data:image/jpeg;base64,${fotoObj.fotoDepois}` }}
          style={styles.imagemMiniatura}
        />
        <Button 
          containerStyle={styles.button} 
          title="Escolher Foto" 
          onPress={() => escolherFoto("depois")}
        />
        <TextInput 
          containerStyle={styles.input} 
          placeholder="Digite a legenda..."
          onChangeText={(text) => setFotoObj(obj => ({...obj, "legendaDepois":text}))}
          onPress={() => escolherFoto(setImageDepois)}
        />
        <Divider />
        <Button containerStyle={styles.button} title='Enviar Fotos' onPress={enviarFotos}/>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  label: {
    alignSelf: 'stretch',
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.small,
  },
  input: {
    alignSelf: 'stretch',
    marginBottom: spacing.large
  },
  imagemMiniatura: {
    alignSelf: 'flex-end',
    width: 100, 
    height: 100, 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkGray
  },
  button: {
    alignSelf: 'stretch',
    marginVertical: spacing.medium
  }
})

export default AdicionarFotoModal