import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const getNewId = (list) => {
  if(list.length > 0){
    let ultimaFoto = list[list.length - 1]
    return (ultimaFoto.id + 1)
  } else {
    return 1
  }
}

export const tirarFotoBase64 = async ({setList, list}) => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync()
  if (status !== 'granted') {
    Alert.alert('Permissão negada', 'Precisamos de acesso à câmera.')
    return
  }

  const resultado = await ImagePicker.launchCameraAsync({
    base64: true,
    quality: 0.7,
    allowsEditing: true
  })

  if (!resultado.assets || resultado.assets.length === 0) {
    return
  }

  const asset = resultado.assets[0]

  if (!asset.base64) {
    Alert.alert("Erro", "Imagem foi capturada, mas sem base64.")
    return
  }

  const dataAtual = new Date()
  const dataDia = dataAtual.toLocaleDateString('pt-BR').replace(/[/]/g, "")
  const dataHora = dataAtual.toLocaleTimeString('pt-BR').replace(/[:]/g, "")

  const fotoObj = {
    id: getNewId(list),
    nome: `Foto-${dataDia}-${dataHora}`,
    foto: asset.base64
  }

  setList([...list, fotoObj])
  Alert.alert("Sucesso", "Foto adicionada com sucesso.")
  
}

export const tirarFotoTroca = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync()
  if (status !== 'granted') {
    Alert.alert('Permissão negada', 'Precisamos de acesso à câmera.')
    return
  }

  const resultado = await ImagePicker.launchCameraAsync({
    base64: false,
    quality: 0.6,
    allowsEditing: true
  })

  if (!resultado.assets || resultado.assets.length === 0) {
    return
  }

  const asset = resultado.assets[0]

  if (!asset.uri) {
    Alert.alert("Erro", "Imagem foi capturada, mas sem caminho de arquivo.")
    return
  }

  const dataAtual = new Date()
  const dataDia = dataAtual.toLocaleDateString('pt-BR').replace(/[/]/g, "")
  const dataHora = dataAtual.toLocaleTimeString('pt-BR').replace(/[:]/g, "")

  const fotoObj = {
    nome: `Troca-${dataDia}-${dataHora}`,
    fotoUri: asset.uri
  }

  Alert.alert("Sucesso", "Foto adicionada com sucesso.")
  return fotoObj
}