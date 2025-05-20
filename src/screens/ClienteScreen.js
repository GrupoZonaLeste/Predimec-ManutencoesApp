import { View, Text, StyleSheet, StatusBar, Alert, Image, FlatList, ScrollView, RefreshControl} from 'react-native'
import { useNavigation, useIsFocused} from '@react-navigation/native';

import Button from '../components/Button';
import ButtonBack from '../components/ButtonBack';
import ButtonDelete from '../components/ButtonDelete';
import ButtonEdit from '../components/ButtonEdit';
import CardManutencao from '../components/CardManutencao';
import Divider from '../components/Divider';
import TextInput from '../components/TextInput';

import database from '../mock/database.json'
import { getClienteTemplate } from '../mock/objectTemplates';
import { shadow } from '../constants/Effects'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";
import { useContext, useEffect, useState} from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ClienteScreen = ({route}) => {
  const { usuario } = useContext(AuthContext)
  const { id } = route.params
  const [clienteObj, setClienteObj] = useState(getClienteTemplate())
  const [updateFlag, setUpdateFlag] = useState(0)

  // estado e função para efetuar recarregamento de lista
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)

    setTimeout(() => {
      let cliente = database.Clientes.find(cliente => cliente.id == id)
      setClienteObj(cliente)
      setNovoNome(cliente.nome)
      setIsEditMode(false)
      setRefreshing(false)
    }, 500)
  }

  // navegação
  const navigation = useNavigation()

  const goToVerManutencao = (id_cliente, id_manutencao) => {
    navigation.navigate('ClienteStack', {
      screen: 'VerManutencao',
      params: {
        id_cliente: id_cliente,
        id_manutencao: id_manutencao
      }
    })
  }

  /*
  const goToCriarManutencao = (id) => {
    navigation.navigate('ClienteStack', {
      screen: 'CriarManutencao',
      params: {
        id: id
      }
    })
  }
  */

  // modo de edição
  const [isEditMode, setIsEditMode] = useState(false)
  const [novoNome, setNovoNome] = useState("")

  const criarManutencao = () => {
    let listaManutencoes = clienteObj.manutencoes

    // criando id da nova manutencao
    let newId = 0;
    if(listaManutencoes.length > 0){
      const ultimoId = listaManutencoes[listaManutencoes.length - 1].id

      if(ultimoId){
        newId = parseInt(ultimoId) + 1
      } 
    } else {
      newId = parseInt(1)
    }

    const novaManutencao = {
      "id": newId,
      "data": new Date(Date.now()).toLocaleString(),
      "funcionario": usuario.nome,
      "equipamentos": []
    }

    clienteObj.manutencoes.push(novaManutencao)

    navigation.navigate("ClienteStack", {
      screen: "VerManutencao",
      params: {
        id_cliente: clienteObj.id,
        id_manutencao: newId
      }
    })
  }

  const salvarAlteracao = () => {
    let novoClienteObj = {...clienteObj, "nome": novoNome}
    
    // FAZER O FETCH UPDATE AQUI

    let novaListaClientes = database.Clientes.filter(item => item.id != id)
    novaListaClientes.push(novoClienteObj)

    // Ordenando a lista pelos IDs
    novaListaClientes.sort((a,b) => a.id - b.id)

    database.Clientes = novaListaClientes
    Alert.alert("Sucesso", "Nome do cliente alterado com sucesso")
    setUpdateFlag(updateFlag => updateFlag + 1)
  }

  const deletarCliente = () => {
    // FAZER O FETCH COM DELETE AQUI PARA APAGAR O CLIENTE

    let listaAtualizada = database.Clientes.filter(item => item.id != id)
    database.Clientes = listaAtualizada
    Alert.alert("", "O cliente foi deletado com sucesso")
    navigation.goBack()
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
            deletarCliente()
          },
        },
      ],
      { cancelable: false }
    );
  }

  // Renderização e Re-render
  // Esse Hook do react-native detecta toda vez que o usuário entra na tela
  const focused = useIsFocused()

  useEffect(() => {
    let cliente = database.Clientes.find(cliente => cliente.id == id)
    setClienteObj(cliente)
    setNovoNome(cliente.nome)
    setIsEditMode(false)
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
            <Button title="Salvar Alterações" containerStyle={{width: '100%'}} onPress={salvarAlteracao} />
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
        
        <Text style={styles.criadoEm}>Criado em {clienteObj.criacao}</Text>
        <Button 
          title='Nova Manutenção' 
          containerStyle={{width: '100%', marginVertical: spacing.medium}}
          onPress={() => criarManutencao()}
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
                nome={item.data} 
                onPress={() => goToVerManutencao(clienteObj.id, item.id)}
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