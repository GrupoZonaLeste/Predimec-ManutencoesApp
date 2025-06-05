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

import { FUNCIONARIO_ROUTES } from '../api/endpoints'

const CriarMembroModal = ({modalVisible, setModalVisible}) => {
  const [novoMembroObj, setNovoMembroObj] = useState(getMembroTemplate())

  const criarFuncionarioAPI = async () => {
    try{
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

      const dataAtual = new Date()

      const resposta_api = await fetch(FUNCIONARIO_ROUTES.POST_FUNCIONARIO, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data_criacao: dataAtual.toISOString(),
          nome: novoMembroObj.nome,
          login: novoMembroObj.login,
          senha: novoMembroObj.senha,
          tipo: "funcionario"
        })
      })

      if(resposta_api.ok){
        Alert.alert('Sucesso','Novo membro criado com sucesso')
        setModalVisible(false)
      } else {
        Alert.alert("Erro", "Erro ao criar equipamento")
      }
    } catch(erro) {
      Alert.alert("Erro", "Erro ao criar equipamento")
      console.error('Erro ao criar funcionário:', erro);
    }
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
        
        <Button containerStyle={styles.button} title="Criar novo membro" onPress={criarFuncionarioAPI}></Button>
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