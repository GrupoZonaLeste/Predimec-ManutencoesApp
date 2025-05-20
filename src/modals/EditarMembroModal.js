import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Alert} from 'react-native'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Modal from '../components/Modal'
import database from '../mock/database.json'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";
import { getMembroTemplate } from '../mock/objectTemplates'

const EditarMembroModal = ({modalVisible, setModalVisible, updateFlag, setUpdateFlag, membroId}) => {
  const [membroObj, setMembroObj] = useState(getMembroTemplate())

  const [novoNome, setNovoNome] = useState("")
  const [novoLogin, setNovoLogin] = useState("")
  const [novaSenha, setNovaSenha] = useState("")

  const alterarMembro = () => {
    let listaMembros = database.Membros
    // FAZER O POST PRA ALTERAR O MEMBRO

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

    let novoMembro = {
      "id": membroObj.id,
      "data": new Date(Date.now()).toLocaleDateString(),
      "tipo": membroObj.tipo,
      "nome": novoNome,
      "login": novoLogin,
      "senha": novaSenha
    }
    
    let listaAtualizada = listaMembros.filter(item => item.id != membroObj.id)
    listaAtualizada.push(novoMembro)

    // Ordenando a lista para devolver o objeto na mesma posicao
    listaAtualizada.sort((a,b) => a.id - b.id)

    database.Membros = listaAtualizada
    Alert.alert("Sucesso", "usuario alterado com sucesso")
    setUpdateFlag(updateFlag => updateFlag + 1)
    setModalVisible(false)
  }

  useEffect(() => {
    if (!membroId) return;

    let membro = database.Membros.find(item => item.id == membroId)
    if (membro) {
      setMembroObj(membro);
      setNovoNome(membro.nome);
      setNovoLogin(membro.login);
      setNovaSenha(membro.senha);
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
        
        <Button containerStyle={styles.button} title="Salvar Alterações" onPress={alterarMembro}></Button>
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