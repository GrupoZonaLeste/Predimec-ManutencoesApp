import React, {useState} from 'react'
import { View, Text, StyleSheet, Alert} from 'react-native'
import database from '../mock/database.json'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Modal from '../components/Modal'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const CriarClienteModal = ({modalVisible, setModalVisible}) => {
  const [nome, setNome] = useState('')

  const criarCliente = () => {
    // FAZER O POST PRA SALVAR O MEMBRO
    const listaClientes = database.Clientes
    let ultimoId = listaClientes[listaClientes.length - 1].id

    let newId
    if(ultimoId){
      newId = ultimoId + 1
    } else {
      newId = 1
    }

    const dataAtual = new Date(Date.now()).toLocaleDateString()

    const novoCliente = {
      "id": newId,
      "nome": nome,
      "criacao": dataAtual,
      "manutencoes": []
    }

    listaClientes.push(novoCliente)
    Alert.alert("Sucesso","Novo cliente cadastrado com sucesso")
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