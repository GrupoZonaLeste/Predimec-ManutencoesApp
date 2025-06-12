import React, {useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet, Alert} from 'react-native'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Modal from '../components/Modal'

import { AuthContext } from '../contexts/AuthContext'
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";
import { getMembroTemplate } from '../mock/objectTemplates'

import { FUNCIONARIO_ROUTES } from '../api/endpoints'

const EditarMembroModal = ({modalVisible, setModalVisible, updateFlag, setUpdateFlag, membroId}) => {
  const { usuario } = useContext(AuthContext)
  const [membroObj, setMembroObj] = useState(getMembroTemplate())

  const [novoNome, setNovoNome] = useState("")
  const [novoLogin, setNovoLogin] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [tipo, setTipo] = useState("")

  // API = Funcionario
  const buscarFuncionarioAPI = async () => {
    try {
      const resposta_api = await fetch(FUNCIONARIO_ROUTES.GET_ONE_FUNCIONARIO(membroId), {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
        }
      })

      if(resposta_api.ok){
        const dados = await resposta_api.json()
        
        setNovoNome(dados.nome);
        setNovoLogin(dados.login);
        setNovaSenha(dados.senha);
        setTipo(dados.tipo)
      } else {
        Alert.alert("Erro", "Erro ao buscar funcionario")
      }
    } catch(erro){
      Alert.alert("Erro", "Erro ao buscar manutenção")
      console.error('Erro ao buscar funcionario:', erro);
    }
  }

  const atualizarFuncionarioAPI = async () => {
    try{
      if(novoNome.length <= 0){
        Alert.alert("Erro", "Informe um nome")
        return
      }

      if(!(novoLogin.includes("@") && novoLogin.includes("."))){
        Alert.alert("Erro", "Informe um email valido")
        return
      } 

      if(novaSenha.length < 8){
        Alert.alert("Erro", "Informe uma senha com no mínimo 8 digitos")
        return
      }

      const resposta_api = await fetch(FUNCIONARIO_ROUTES.PUT_FUNCIONARIO(membroId), {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
        },
        body: JSON.stringify({
          id: membroId,
          nome: novoNome,
          login: novoLogin,
          senha: novaSenha,
          tipo: tipo
        })
      })

      if(resposta_api.ok){
        setModalVisible(false)
        Alert.alert("Sucesso", "funcionário alterado com sucesso")
        setUpdateFlag(updateFlag => updateFlag + 1)
      } else {
        Alert.alert("Erro", "Erro ao atualizar funcionário")
      }
    } catch(erro){
      Alert.alert("Erro", "Erro ao atualizar funcionário")
      console.error('Erro ao atualizar funcionário:', erro);
    }
  }

  useEffect(() => {
    if(modalVisible){
      buscarFuncionarioAPI()
    }
  },[membroId])

  return(
    <Modal title="Editar Membro" modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View style={{flexGrow: 1, width: '100%', alignItems: 'baseline', justifyContent: 'flex-start'}}>
        <Text style={styles.label}>Nome</Text>
        <TextInput 
          containerStyle={styles.input} 
          placeholder="Digite o nome do membro" 
          value={novoNome}
          onChangeText={setNovoNome} 
          
        />
        
        <Text style={styles.label}>Login</Text>
        <TextInput 
          containerStyle={styles.input} 
          placeholder="Digite o login do membro" 
          value={novoLogin}
          onChangeText={setNovoLogin} 
        />
        
        <Text style={styles.label}>Senha</Text>
        <TextInput 
          containerStyle={styles.input} 
          placeholder="Digite a senha do membro" 
          value={novaSenha}
          onChangeText={setNovaSenha} 
        />
        
        <Button containerStyle={styles.button} title="Salvar Alterações" onPress={atualizarFuncionarioAPI}></Button>
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

export default EditarMembroModal