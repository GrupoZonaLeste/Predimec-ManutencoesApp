import React, {useEffect, useState} from 'react'
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

import urlapi from '../utils/devconfig'
import ConfigScreen from './ConfigScreen';

const MembrosScreen = () => {
  const [modalNovoMembro, setModalNovoMembro] = useState(false)
  const [modalEditarMembro, setModalEditarMembro] = useState(false)

  
  const toggleModalNovoMembro = () => {
    setModalNovoMembro(!modalNovoMembro)
  }
  
  const [oldNome, setOldNome] = useState()
  const [oldLogin, setOldLogin] = useState()
  const [oldSenha, setOldSenha] = useState()
  const [dadosMembro, setDadoMembro] = useState([])
  const [updateFlag, setUpdateFlag] = useState(0);

  const toggleModalEditarMembro = (nome, login, senha) => {
    setOldNome(nome)
    setOldLogin(login)
    setOldSenha(senha)
    setModalEditarMembro(!modalEditarMembro)
  }

  useEffect(() => {
    const pegarDados = async () => {   
        let resposta = await fetch(`${urlapi.urlapi}/listar-membros`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json'        
            }
        })
        let dados = await resposta.json() 
        setDadoMembro(Object.entries(dados))
    }
    pegarDados()
  }, [updateFlag])

  const forcarAtualizacao = () => {
    setUpdateFlag(prev => prev + 1); 
  };
  return(
    <View style={styles.mainContainer}>
      <Button title='FA' onPress={forcarAtualizacao}></Button>
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
          {
            dadosMembro.map((element) => {
              return(
                <CardFuncionario
                key={element[0]}
                nome={element[1].nome} 
                login={element[1].email} 
                senha={element[1].senha}
                dataCriacao={element[1].datacriacao} 
                toggleModal={() => toggleModalEditarMembro(element[1].nome, element[1].email, element[1].senha)}
                />
              )
            })
          }
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