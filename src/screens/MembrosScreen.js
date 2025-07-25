import React, {useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, Image, FlatList, RefreshControl} from 'react-native'

import Logomarca from '../components/Logomarca';
import Button from '../components/Button';
import CardFuncionario from '../components/CardFuncionario';
import CriarMembroModal from '../modals/CriarMembroModal';
import EditarMembroModal from '../modals/EditarMembroModal';
import { shadow } from '../constants/Effects';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";
import { AuthContext } from '../contexts/AuthContext';

import { formatarData } from '../utils/conversorData';
import { FUNCIONARIO_ROUTES } from '../api/endpoints';

const MembrosScreen = () => {
  const { usuario } = useContext(AuthContext)
  const [modalNovoMembro, setModalNovoMembro] = useState(false)
  const [modalEditarMembro, setModalEditarMembro] = useState(false)
  const [updateFlag, setUpdateFlag] = useState(0)
  
  const [listaMembros, setListaMembros] = useState([])
  const [membroId, setMembroId] = useState(0)

  // estado e função para efetuar recarregamento de lista
  const [refreshing, setRefreshing] = useState(false)

  // API - Funcionarios 
  const buscarFuncionariosAPI = async () => {
    try{
      const resposta_api = await fetch(FUNCIONARIO_ROUTES.GET_ALL_FUNCIONARIOS, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
        }
      })

      if(resposta_api.ok){
        const dados = await resposta_api.json()
        setListaMembros(dados)
      } else {
        Alert.alert("Erro", "Erro ao buscar funcionários")
      }
    } catch(erro){
      Alert.alert("Erro", "Erro ao buscar funcionários")
      console.error('Erro ao buscar funcionários:', erro);
    }
  } 

  // recarregar lista
  const handleRefresh = () => {
    setRefreshing(true)

    setTimeout(() => {
      buscarFuncionariosAPI()
      setRefreshing(false)
    }, 500)
  }

  const toggleModalNovoMembro = () => {
    setModalNovoMembro(!modalNovoMembro)
  }

  const toggleModalEditarMembro = (id) => {
    setMembroId(id)
    setModalEditarMembro(!modalEditarMembro)
  }

  useEffect(() => {
    buscarFuncionariosAPI()
  }, [modalNovoMembro, updateFlag])

  return(
    <View style={styles.mainContainer}>
      <CriarMembroModal modalVisible={modalNovoMembro} setModalVisible={setModalNovoMembro} />
      <EditarMembroModal 
        modalVisible={modalEditarMembro} 
        setModalVisible={setModalEditarMembro}
        updateFlag={updateFlag}
        setUpdateFlag={setUpdateFlag} 
        membroId={membroId}
      />

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Logomarca />
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.tituloMembros}>Membros</Text>
        <Button title="Adicionar Membro" onPress={toggleModalNovoMembro} containerStyle={{width: '100%', marginVertical: spacing.medium}}/>
      </View>

      <View style={{flexGrow: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        {listaMembros == 0 ? (
          <ScrollView 
            style={[{flex: 1}, shadow, styles.nenhumMembroContainer]}
            contentContainerStyle={{height: '100%', alignItems: 'center', justifyContent: 'center'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }  
          >
            <Image 
              style={styles.imgNenhumMembro}
              source={require('../../assets/images/imagem_nenhum_membro.png')} 
            />
            <Text style={styles.textoNenhumMembro}>Ainda não há membros cadastrados</Text>
          </ScrollView>
        ) : (
          <FlatList style={[{flex: 1}, shadow,styles.funcionariosContainer]} persistentScrollbar={true} 
            data={listaMembros}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <CardFuncionario
                id={item.id}
                data={formatarData(item.data_criacao)}
                nome={item.nome}
                login={item.login}
                senha={item.senha}
                tipo={item.tipo}
                toggleModal={() => toggleModalEditarMembro(item.id)}
                setUpdateFlag={setUpdateFlag}
              />
            )}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        )}
        
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
  funcionariosContainer: {
    width: "100%",
    backgroundColor: colors.white,
    margin: spacing.medium,
    borderWidth: 1,
    paddingHorizontal: spacing.large,
    borderColor: colors.gray,
    borderRadius: 8,
  },
  nenhumMembroContainer: { 
    width: '100%', 
    backgroundColor: colors.white,
    margin: spacing.medium,
    borderWidth: 1,
    paddingHorizontal: spacing.large,
    borderColor: colors.gray,
    borderRadius: 8,
  },
  imgNenhumMembro: {
    width: 512 / 4,
    height: 512 / 4,
    opacity: 0.8,
    marginVertical: spacing.medium,
  },
  textoNenhumMembro: {
    color: colors.darkGray,
    fontFamily: 'Inter-Regular',
    fontSize: fontSizes.medium,
    width: '75%',
    textAlign: 'center',
    marginVertical: spacing.medium,
  }
})

export default MembrosScreen