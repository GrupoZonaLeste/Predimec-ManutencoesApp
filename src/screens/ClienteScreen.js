import { useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, StatusBar, Alert, Image, FlatList, ScrollView, RefreshControl} from 'react-native'
import { useNavigation, useIsFocused} from '@react-navigation/native';

import Button from '../components/Button';
import ButtonBack from '../components/ButtonBack';
import ButtonDelete from '../components/ButtonDelete';
import ButtonEdit from '../components/ButtonEdit';
import CardManutencao from '../components/CardManutencao';
import Divider from '../components/Divider';
import TextInput from '../components/TextInput';

import { getClienteTemplate } from '../mock/objectTemplates';
import { shadow } from '../constants/Effects'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";
import { AuthContext } from '../contexts/AuthContext';
import { formatarData } from '../utils/conversorData';

import { CLIENTE_ROUTES } from '../api/endpoints';
import { MANUTENCAO_ROUTES } from '../api/endpoints';

const ClienteScreen = ({route}) => {
  const { usuario } = useContext(AuthContext)
  const { id } = route.params
  const [clienteObj, setClienteObj] = useState(getClienteTemplate())
  const [updateFlag, setUpdateFlag] = useState(0)

  // estado e função para efetuar recarregamento de lista
  const [refreshing, setRefreshing] = useState(false)

  // API - CLIENTE
  const buscarClienteAPI = async () => {
    try{
      const resposta_api = await fetch(CLIENTE_ROUTES.GET_ONE_CLIENTE(id), {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
        }
      })

      if(resposta_api.ok){
        const dados = await resposta_api.json()
        setClienteObj(dados)
        setNovoNome(dados.nome)
        setIsEditMode(false)
      }
    } catch(erro){
      console.error('Erro ao buscar cliente:', erro);
    }
  }

  const atualizarClienteAPI = async() => {
    try{
      const resposta_api = await fetch(CLIENTE_ROUTES.PUT_CLIENTE(id), {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
        },
        body: JSON.stringify({
          id: id,
          nome: novoNome
        })
      })

      if(resposta_api.ok){
        Alert.alert("Sucesso", "Nome do cliente alterado com sucesso")
        setUpdateFlag(updateFlag => updateFlag + 1)
      } else {
        Alert.alert("Erro", "Erro ao atualizar cliente")
      }
    } catch(erro){
      console.error('Erro ao buscar cliente:', erro);
    }
  } 

  const deletarClienteAPI = async() => {
    try{
      const resposta_api = await fetch(CLIENTE_ROUTES.DELETE_CLIENTE(id), {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
        }
      })

      if(resposta_api.ok){
        Alert.alert("Sucesso", "Cliente excluido com sucesso!")
        navigation.goBack()
      } else {
        Alert.alert("Erro", "Erro ao excluir cliente")
      }
    } catch(erro){
      Alert.alert("Erro", "Erro ao excluir cliente")
      console.error('Erro ao deletar cliente:', erro);
    }
  }

  const confirmarDeletar = () => {
    Alert.alert(
      '',
      'Tem certeza que deseja deletar o cliente? Todas as manutenções serão perdidas.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deletarClienteAPI()
          },
        },
      ],
      { cancelable: false }
    );
  }

  // API - MANUTENCAO
  const criarManutencaoAPI = async () => {
    try{
      const dataAtual = new Date()

      const resposta_api = await fetch(MANUTENCAO_ROUTES.POST_MANUTENCAO, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
        },
        body: JSON.stringify({
          data_criacao: dataAtual.toISOString(),
          cliente_id: id,
          funcionario_id: usuario.id
        })
      })

      if(resposta_api.ok){
        const res = await resposta_api.json()

        navigation.navigate("ClienteStack", {
          screen: "VerManutencao",
          params: {
            id_cliente: clienteObj.id,
            id_manutencao: res.id
          }
        })
      } else {
        Alert.alert("Erro","Erro ao criar manutenção")
      }
    } catch(erro){
      console.error('Erro ao criar manutenção:', erro);
    }
  }

  // Recarregando lista
  const handleRefresh = () => {
    setRefreshing(true)

    setTimeout(() => {
      buscarClienteAPI()
      setRefreshing(false)
    }, 500)
  }

  // navegação
  const navigation = useNavigation()

  const goToVerManutencao = (id_manutencao) => {
    navigation.navigate('ClienteStack', {
      screen: 'VerManutencao',
      params: {
        id_manutencao: id_manutencao
      }
    })
  }

  // modo de edição
  const [isEditMode, setIsEditMode] = useState(false)
  const [novoNome, setNovoNome] = useState("")

  // Renderização e Re-render
  // Esse Hook do react-native detecta toda vez que o usuário entra na tela
  const focused = useIsFocused()

  useEffect(() => {
    buscarClienteAPI()
  }, [focused, updateFlag])

  // Checagem de permissão pra excluir
  const permissaoExcluir = (usuario.tipo == "admin")

  const containerEditStyle = isEditMode ?
    ({borderWidth: 8, borderColor: colors.yellow}) :
    ({borderWidth: 0, borderColor: 'transparent'})

  return(
    <View style={[styles.mainContainer, containerEditStyle]}>
      <View style={{flex: 'auto', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <ButtonBack onPress={() => navigation.goBack()}/>
        <View style={{flex: 'auto', flexDirection: 'row-reverse', width: '30%', alignItems: 'center', justifyContent: 'space-between'}}>
          {permissaoExcluir && (
            <ButtonDelete onPress={confirmarDeletar} />
          )}
          <ButtonEdit isSelected={isEditMode} onPress={() => setIsEditMode(!isEditMode)}/>
        </View>
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        {isEditMode ? (
          <>
            <Button title="Salvar Alterações" containerStyle={{width: '100%'}} onPress={atualizarClienteAPI} />
            <Divider />
            <TextInput 
              placeholder="Digite um nome..."
              value={novoNome}
              onChangeText={setNovoNome}
              containerStyle={{width: '100%'}}
              style={{fontFamily: 'Inter-Bold', fontSize: fontSizes.large, height: 50}}
            />
          </>
        ) : (
          <Text style={styles.nomeCliente}>{clienteObj.nome}</Text>
        )}
        
        <Text style={styles.criadoEm}>
          Criado em {formatarData(clienteObj.data_criacao)}
        </Text>
        <Button 
          title='Nova Manutenção' 
          containerStyle={{width: '100%', marginVertical: spacing.medium}}
          onPress={criarManutencaoAPI}
        />
      </View>

      <View style={{flexGrow: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.tituloManutencoes}>Manutenções</Text>

        {clienteObj.manutencoes.length == 0 ? (
          <ScrollView 
            style={[{flex: 1}, shadow, styles.nenhumaManuContainer]} 
            contentContainerStyle={{height: '100%', alignItems: 'center', justifyContent: 'center'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
            }
          >
            <Image 
              style={styles.imgNenhumaManu}
              source={require('../../assets/images/imagem_nenhuma_manutencao.png')} 
            />
            <Text style={styles.textoNenhumaManu}>O Cliente não possui nenhuma manutenção</Text>
          </ScrollView>
        ) : (
          <FlatList
            style={[{flex: 1}, shadow, styles.manutenContainer]}
            data={clienteObj.manutencoes}
            keyExtractor={(item, idx) => idx}
            renderItem={({ item }) => (
              <CardManutencao 
                nome={formatarData(item.data_criacao)} 
                onPress={() => goToVerManutencao(item.id)}
              />
            )}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={true}
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
  nomeCliente: {
    alignSelf: 'baseline',
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.xlarge,
  },
  criadoEm: {
    alignSelf: 'baseline',
    fontFamily: 'Inter-Regular',
    fontSize: fontSizes.medium,
    marginVertical: spacing.small
  },
  tituloManutencoes: {
    alignSelf: 'baseline',
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.large,
    marginVertical: spacing.small
  },
  manutenContainer: {
    width: "100%",
    backgroundColor: colors.white,
    margin: spacing.medium,
    borderWidth: 1,
    paddingHorizontal: spacing.large,
    borderColor: colors.gray,
    borderRadius: 8,
  },
  nenhumaManuContainer: { 
    width: '100%', 
    backgroundColor: colors.white,
    margin: spacing.medium,
    borderWidth: 1,
    paddingHorizontal: spacing.large,
    borderColor: colors.gray,
    borderRadius: 8,
  },
  imgNenhumaManu: {
    width: 600 / 4,
    height: 512 / 4,
    opacity: 0.8,
    marginVertical: spacing.medium,
  },
  textoNenhumaManu: {
    color: colors.darkGray,
    fontFamily: 'Inter-Regular',
    fontSize: fontSizes.medium,
    width: '75%',
    textAlign: 'center',
    marginVertical: spacing.medium,
  }
})

export default ClienteScreen