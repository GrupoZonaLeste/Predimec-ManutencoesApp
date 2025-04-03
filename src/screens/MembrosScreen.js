import React, {useState} from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Logomarca from '../components/Logomarca';
import Button from '../components/Button';
import CardFuncionario from '../components/CardFuncionario';
import CriarMembroModal from '../modals/CriarMembroModal'
import EditarMembroModal from '../modals/EditarMembroModal';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const MembrosScreen = () => {
  const [modalNovoMembro, setModalNovoMembro] = useState(false)
  const [modalEditarMembro, setModalEditarMembro] = useState(false)

  
  const toggleModalNovoMembro = () => {
    setModalNovoMembro(!modalNovoMembro)
  }
  
  const [oldNome, setOldNome] = useState()
  const [oldLogin, setOldLogin] = useState()
  const [oldSenha, setOldSenha] = useState()


  const toggleModalEditarMembro = (nome, login, senha) => {
    setOldNome(nome)
    setOldLogin(login)
    setOldSenha(senha)
    setModalEditarMembro(!modalEditarMembro)
  }



  return(
    <View style={styles.mainContainer}>
      <CriarMembroModal modalVisible={modalNovoMembro} setModalVisible={setModalNovoMembro} />
      <EditarMembroModal 
        modalVisible={modalEditarMembro} 
        setModalVisible={setModalEditarMembro} 
        oldLogin={oldLogin} 
        oldNome={oldNome}
        oldSenha={oldSenha}
      />

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Logomarca />
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.tituloMembros}>Membros</Text>
        <Button title="Adicionar Membro" onPress={toggleModalNovoMembro} containerStyle={{width: '100%', marginVertical: spacing.medium}}/>
      </View>

      <View style={{flexGrow: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <ScrollView style={[{flex: 1}, styles.manutenContainer]} persistentScrollbar={true}>
          {/**
           * Aqui vai ser necessário fazer um laço pra renderizar cada funcionario do banco
           */}
          <CardFuncionario 
            nome="Funcionario 1" 
            login="abc@abc.com" 
            senha="123123123" 
            toggleModal={() => toggleModalEditarMembro("Funcionario 1", "abc@abc.com", "123123123")}
          />
          <CardFuncionario 
            nome="Funcionario 2" 
            login="xyz@xyz.com" 
            senha="100100100" 
            toggleModal={() => toggleModalEditarMembro("Funcionario 2", "xyz@xyz.com", "100100100")}
          />
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'green',
    padding: spacing.xlarge,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.white
  },
  tituloMembros: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.xlarge,
  },
  manutenContainer: {
    width: "100%",
    backgroundColor: colors.white,
    margin: spacing.medium,
    borderWidth: 1,
    paddingHorizontal: spacing.large,
    borderColor: colors.gray,
    borderRadius: 8,
  }
})

export default MembrosScreen