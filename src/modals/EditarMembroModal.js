import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Alert} from 'react-native'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Modal from '../components/Modal'
import { validarEmail, validarInputs } from '../utils/Validadores'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const EditarMembroModal = ({modalVisible, setModalVisible, oldNome, oldLogin, oldSenha}) => {
  const [nomeAlt, setNome] = useState('')
  const [loginAlt, setLogin] = useState('')
  const [senhaAlt, setSenha] = useState('')

  const alterarMembro = () => {
    // FAZER O POST PRA ALTERAR O MEMBRO
    Alert.alert("Sucesso","Membro Alterado com Sucesso\n"+nomeAlt+" - "+loginAlt+" - "+senhaAlt)
  }

  // Iniciando os useStates com os valores antigos
  useEffect(() => {
    setNome(oldNome)
    setLogin(oldLogin)
    setSenha(oldSenha)
  },[oldNome, oldLogin, oldSenha])

  return(
    <Modal title="Editar Membro" modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View style={{flexGrow: 1, width: '100%', alignItems: 'baseline', justifyContent: 'flex-start'}}>
        <Text style={styles.label}>Nome</Text>
        <TextInput containerStyle={styles.input} placeholder="Digite o nome do membro" onChangeText={setNome} defaultValue={oldNome}/>
        <Text style={styles.label}>Login</Text>
        <TextInput containerStyle={styles.input} placeholder="Digite o login do membro" onChangeText={setLogin} defaultValue={oldLogin}/>
        <Text style={styles.label}>Senha</Text>
        <TextInput containerStyle={styles.input} placeholder="Digite a senha do membro" onChangeText={setSenha} defaultValue={oldSenha}/>
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