import React, {useState} from 'react'
import { View, Text, StyleSheet, Alert} from 'react-native'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Modal from '../components/Modal'
import database from '../mock/database.json'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";
import { getMembroTemplate } from '../mock/objectTemplates'

const CriarMembroModal = ({modalVisible, setModalVisible}) => {
  const [novoMembroObj, setNovoMembroObj] = useState(getMembroTemplate())

  const criarMembro = () => {
    let listaMembros = database.Membros

    if(novoMembroObj.nome.length <= 0){
      Alert.alert("Erro", "Informe um nome")
      return
    }

    if(!(novoMembroObj.login.includes("@") && novoMembroObj.login.includes("."))){
      Alert.alert("Erro", "Informe um email valido")
      return
    } 

    if(novoMembroObj.senha.length < 8){
      Alert.alert("Erro", "Informe uma senha com no mínimo 8 digitos")
      return
    }
    
    let newId = 0
    if(listaMembros.length > 0){
      let ultimoId = database.Membros[listaMembros.length - 1].id
      newId = parseInt(ultimoId) + 1
    } else {
      newId = parseInt(1)
    }

    let dataAtual = new Date(Date.now()).toLocaleDateString()

    let novoMembro = {
      "id": newId,
      "data": dataAtual,
      "tipo": "funcionario",
      "nome": novoMembroObj.nome,
      "login": novoMembroObj.login,
      "senha": novoMembroObj.senha
    }

    // FAZER O POST PRA SALVAR O MEMBRO

    listaMembros.push(novoMembro)
    Alert.alert('Sucesso','Novo membro criado com sucesso')
    setModalVisible(false)
  }

  return(
    <Modal title="Criar Membro" modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View style={{flexGrow: 1, width: '100%', alignItems: 'baseline', justifyContent: 'flex-start'}}>
        <Text style={styles.label}>Nome</Text>
        {
        <TextInput 
          containerStyle={styles.input} 
          placeholder="Digite o nome do membro" 
          onChangeText={(text) => setNovoMembroObj(obj => ({...obj, "nome": text}))}
        />
        }
        
        <Text style={styles.label}>Login</Text>
        <TextInput 
          containerStyle={styles.input} 
          placeholder="Digite o login do membro" 
          onChangeText={(text) => setNovoMembroObj(obj => ({...obj, "login": text}))}/>
        
        <Text style={styles.label}>Senha</Text>
        <TextInput 
          containerStyle={styles.input} 
          placeholder="Digite a senha do membro" 
          onChangeText={(text) => setNovoMembroObj(obj => ({...obj, "senha": text}))}
        />
        
        <Button containerStyle={styles.button} title="Criar novo membro" onPress={criarMembro}></Button>
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

export default CriarMembroModal