import {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, StatusBar, ScrollView, FlatList, RefreshControl} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Logomarca from '../components/Logomarca';
import CardSmallManutencao from '../components/CardSmallManutencao'
import ButtonAdd from '../components/ButtonAdd';
import CardCliente from '../components/CardCliente';
import CriarClienteModal from '../modals/CriarClienteModal'
import { shadow } from '../constants/Effects';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";
import { getClienteTemplate } from '../mock/objectTemplates';

import { formatarData } from '../utils/conversorData';
import { CLIENTE_ROUTES } from '../api/endpoints';
import { MANUTENCAO_ROUTES } from '../api/endpoints';

const HomeScreen = () => {
  const navigation = useNavigation()
  const [listaClientes, setListaClientes] = useState(getClienteTemplate())

  // estado e função para efetuar recarregamento de lista
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)

    setTimeout(() => {
      buscarDadosAPI()
      setRefreshing(false)
    }, 500)
  }

  // navegação
  const goToClientePage = (id) => {
    navigation.navigate('ClienteStack',{
      screen: 'Cliente',
      params: {
        id: id
      }
    })
  }

  // modal de criar cliente
  const [modalCriarCliente, setModalCriarCliente] = useState(false)

  const toggleModal = () => {
    setModalCriarCliente(!modalCriarCliente)
  }

  // Renderização da lista e re-render
  const buscarDadosAPI = async () => {
    try {
      const resposta_api = await fetch(CLIENTE_ROUTES.GET_ALL_CLIENTES, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(resposta_api.ok){
        const dados = await resposta_api.json();
        setListaClientes(dados)
      }
    } catch(erro){
      console.error('Erro ao buscar clientes:', erro);
    }
  }

  const focused = useIsFocused()

  useEffect(() => {
    buscarDadosAPI()
  }, [focused, modalCriarCliente])

  return(
    <SafeAreaView style={styles.mainContainer}>
      <CriarClienteModal modalVisible={modalCriarCliente} setModalVisible={setModalCriarCliente} />

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Logomarca />
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.tituloPagina}>Manutenções</Text>
        <Text style={styles.subTitulo}>Últimas manutenções</Text>
        <View style={styles.ultimasContainer}>
          <CardSmallManutencao cliente="Cliente 01" funcionario="Funcionario" data="00/00/00"/>
          <CardSmallManutencao cliente="Cliente 01" funcionario="Funcionario" data="00/00/00"/>
          <CardSmallManutencao cliente="Cliente 01" funcionario="Funcionario" data="00/00/00"/>
        </View>
      </View>

      <View style={{flexGrow: 1, width: '100%', alignItems: 'center', padding: spacing.xlarge}}>
        <View style={[{flex: 'auto'}, styles.clientesHeader]}>
          <Text style={[styles.titulo, {textAlign: 'left'}]}>Todos os Clientes</Text>
          <ButtonAdd onPress={toggleModal}/>
        </View>
        {listaClientes.length == 0 ? (
          <>
            <ScrollView 
              style={[{flex: 1}, shadow, styles.nenhumClienteContainer]}
              contentContainerStyle={{height: '100%', alignItems: 'center', justifyContent: 'center'}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
              }
            >
              <Image 
                style={styles.imgNenhumCliente}
                source={require('../../assets/images/imagem_nenhum_cliente.png')} 
              />
              <Text style={styles.textoNenhumCliente}>Não há clientes cadastrados</Text>
            </ScrollView>
            <Text style={styles.dicaLista}>Puxe a lista para baixo para recarregar</Text>
          </>
        ) : (
          <>
            <FlatList style={[{flex: 1}, shadow, styles.clientesContainer]} persistentScrollbar={true}
              data={listaClientes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CardCliente
                  nome={item.nome}
                  onPress={() => goToClientePage(item.id)}
                />
              )}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
            <Text style={styles.dicaLista}>Puxe a lista para baixo para recarregar</Text>
          </>
          
        )}
        
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.white
  },
  logo: {
    width: 1100 / 7,
    height: 200 / 7,
    marginVertical: spacing.large
  },
  tituloPagina: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.xlarge
  },
  titulo: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.large
  },
  subTitulo: {
    fontFamily: 'Inter-Regular',
    fontSize: fontSizes.small
  },  
  ultimasContainer: {
    width: "90%",
    flexDirection: 'row',
    backgroundColor: colors.gray,
    margin: spacing.medium,
    borderWidth: 1,
    borderColor: colors.gray,
    padding: spacing.large,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clientesHeader: {
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginVertical: spacing.medium,
  },
  dicaLista: {
    fontFamily: 'Inter-Regular',
    fontSize: 12
  },
  clientesContainer: {
    width: "100%",
    backgroundColor: colors.white,
    margin: spacing.medium,
    borderWidth: 1,
    paddingHorizontal: spacing.large,
    borderColor: colors.gray,
    borderRadius: 8,
  },
  nenhumClienteContainer: { 
    width: '100%', 
    backgroundColor: colors.white,
    margin: spacing.medium,
    borderWidth: 1,
    paddingHorizontal: spacing.large,
    borderColor: colors.gray,
    borderRadius: 8,
  },
  imgNenhumCliente: {
    width: 556 / 4,
    height: 512 / 4,
    opacity: 0.8,
    marginVertical: spacing.medium,
  },
  textoNenhumCliente: {
    color: colors.darkGray,
    fontFamily: 'Inter-Regular',
    fontSize: fontSizes.medium,
    width: '75%',
    textAlign: 'center',
    marginVertical: spacing.medium,
  }
})

export default HomeScreen