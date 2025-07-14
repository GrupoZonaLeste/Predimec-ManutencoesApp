import React, {useState} from 'react'
import { View, Text, StyleSheet, Alert, Image} from 'react-native'

import Button from '../components/Button'
import Divider from '../components/Divider'
import Modal from '../components/Modal'
import InputPicker from '../components/InputPicker'
import TextInput from '../components/TextInput'

import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const AdicionarTrocaModal = ({modalVisible, setModalVisible, list, setList}) => {
  const opcoesPicker = [
    {label: 'Eixo', value: 'eixo'},
    {label: 'Rolamento', value: 'rolamento'},
    {label: 'Polia', value: 'polia'},
    {label: 'Mancal', value: 'mancal'},
    {label: 'Outro...', value: 'outro'},
  ]

  const [trocaSelecionada, setTrocaSelecionada] = useState('eixo')
  const [outraTroca, setOutraTroca] = useState("")

  const criarNovaTroca = () => {
    let trocaObj = {
      "nome": "",
      "fotos": []
    }

    if(trocaSelecionada === "outro"){
      trocaObj = {
        "nome": outraTroca.toLowerCase(),
        "fotos": []
      }
    } else {
      trocaObj = {
        "nome": trocaSelecionada.toLowerCase(),
        "fotos": []
      }
    }

    let trocaJaExiste = false;
    for(const troca of list){
      if(troca.nome === trocaObj.nome){
        trocaJaExiste = true;
      }
    }

    if(trocaJaExiste){
      Alert.alert('Erro', 'Essa troca já existe no equipamento')
    } else {
      setList(prev => [...prev, trocaObj])
      setModalVisible(false)
    }
  }

  return(
    <Modal title="Adicionar Troca" modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View style={{flexDirection: 'row'}}>
        <InputPicker 
          label="Tipo de troca"
          items={opcoesPicker}
          selectedValue={trocaSelecionada}
          setSelectedValue={setTrocaSelecionada}
        />
      </View>

      {trocaSelecionada === 'outro' && (
        <View style={{flexDirection: 'row'}}>
          <TextInput 
            containerStyle={{flex: 1}} 
            style={styles.inputTroca}
            placeholder="Nome da troca..."
            value={outraTroca}
            onChangeText={setOutraTroca}
          />
        </View>
      )}

      <View style={{flexDirection: 'row', width: '100%'}}>
        <Button 
          title='Criar Nova Troca' 
          containerStyle={{width: '100%', alignSelf: 'stretch'}}
          onPress={criarNovaTroca}
        />
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
  inputTroca: {
    fontFamily: 'Inter-SemiBold', 
    fontSize: fontSizes.medium, 
    minHeight: 50, 
    marginVertical: spacing.medium
  },
})

export default AdicionarTrocaModal