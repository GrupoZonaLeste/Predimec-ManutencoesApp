import React, {useState} from 'react'
import { View, Text, StyleSheet, Alert} from 'react-native'
import database from '../mock/database.json'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Modal from '../components/Modal'
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";
import { CLIENTE_ROUTES } from '../api/endpoints'

const CriarClienteModal = ({modalVisible, setModalVisible}) => {
  const [nome, setNome] = useState('')

  const criarCliente = async () => {
    // FAZER O POST PRA SALVAR O MEMBRO
    const dataAtual = new Date()

    try{
      const resposta_api = await fetch(CLIENTE_ROUTES.POST_CLIENTE, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: nome,
          data_criacao: dataAtual.toISOString()
        })
      })

      if(resposta_api.ok){
        const res = await resposta_api.json()
        Alert.alert("Sucesso","Novo cliente cadastrado com sucesso")
        setModalVisible(false)
      } else {
        Alert.alert("Erro","Erro ao criar cliente")
      }
    }catch(erro){
      console.error('Erro ao criar cliente:', erro);
    }
  }

  return(
    <Modal title="Criar Cliente" modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View style={{flexGrow: 1, width: '100%', alignItems: 'baseline', justifyContent: 'flex-start'}}>
        <Text style={styles.label}>Nome</Text>
        <TextInput containerStyle={styles.input} placeholder="Digite o nome do cliente" onChangeText={setNome}/>
        <Button containerStyle={styles.button} title="Criar novo cliente" onPress={criarCliente}></Button>
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
  button: {
    alignSelf: 'stretch',
    marginVertical: spacing.medium
  }
})

export default CriarClienteModal