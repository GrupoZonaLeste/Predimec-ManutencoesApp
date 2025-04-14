import {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, StatusBar, ScrollView, FlatList} from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Logomarca from '../components/Logomarca';
import database from '../mock/database.json'
import CardSmallManutencao from '../components/CardSmallManutencao'
import ButtonAdd from '../components/ButtonAdd';
import CardCliente from '../components/CardCliente';
import CriarClienteModal from '../modals/CriarClienteModal'
import { shadow } from '../constants/Effects';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";
import { getClienteTemplate } from '../mock/objectTemplates';

const HomeScreen = () => {
  const navigation = useNavigation()

  const [listaClientes, setListaClientes] = useState(getClienteTemplate())

  const goToClientePage = (id) => {
    navigation.navigate('ClienteStack',{
      screen: 'Cliente',
      params: {
        id: id
      }
    })
  }

  const [modalCriarCliente, setModalCriarCliente] = useState(false)

  const toggleModal = () => {
    setModalCriarCliente(!modalCriarCliente)
  }

  // Renderização da lista e re-render
  const focused = useIsFocused()

  useEffect(() => {
    setListaClientes(database.Clientes)
  }, [focused, modalCriarCliente])

  return(
    <View style={styles.mainContainer}>
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
          <View style={[{flex: 1}, shadow, styles.nenhumClienteContainer]}>
            <Image 
              style={styles.imgNenhumCliente}
              source={require('../../assets/images/imagem_nenhum_cliente.png')} 
            />
            <Text style={styles.textoNenhumCliente}>Não há clientes cadastrados</Text>
          </View>
        ) : (
          <FlatList style={[{flex: 1}, shadow, styles.clientesContainer]} persistentScrollbar={true}
            data={listaClientes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardCliente
                nome={item.nome}
                onPress={() => goToClientePage(item.id)}
              />
            )}
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
    alignItems: 'center', 
    justifyContent: 'center',
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