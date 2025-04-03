import React, {useState} from 'react'
import { View, Text, StyleSheet, Alert} from 'react-native'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Modal from '../components/Modal'
import { validarEmail, validarInputs } from '../utils/Validadores'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const CriarMembroModal = ({modalVisible, setModalVisible}) => {
  const [nome, setNome] = useState('')
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')

  const criarMembro = () => {
    
    // FAZER O POST PRA SALVAR O MEMBRO
    Alert.alert("Sucesso","Membro Cadastrado\n"+nome+" - "+login+" - "+senha)
  }

  return(
    <Modal title="Criar Membro" modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View style={{flexGrow: 1, width: '100%', alignItems: 'baseline', justifyContent: 'flex-start'}}>
        <Text style={styles.label}>Nome</Text>
        <TextInput containerStyle={styles.input} placeholder="Digite o nome do membro" onChangeText={setNome}/>
        <Text style={styles.label}>Login</Text>
        <TextInput containerStyle={styles.input} placeholder="Digite o login do membro" onChangeText={setLogin}/>
        <Text style={styles.label}>Senha</Text>
        <TextInput containerStyle={styles.input} placeholder="Digite a senha do membro" onChangeText={setSenha}/>
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