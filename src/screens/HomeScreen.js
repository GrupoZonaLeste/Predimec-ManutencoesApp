import { View, Text, StyleSheet, Image, StatusBar, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Logomarca from '../components/Logomarca';
import database from '../mock/database.json'
import CardSmallManutencao from '../components/CardSmallManutencao'
import ButtonAdd from '../components/ButtonAdd';
import CardCliente from '../components/CardCliente';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const HomeScreen = () => {
  const navigation = useNavigation()

  const goToClientePage = (id, nome) => {
    navigation.navigate('ClienteStack',{
      screen: 'Cliente',
      params: {
        id: id,
        nome: nome
      }
    })
  }

  return(
    <View style={styles.mainContainer}>
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
          <ButtonAdd />
        </View>
        <ScrollView style={[{flex: 1}, styles.clientesContainer]} persistentScrollbar={true}>
          {database.Clientes.map((item) => {
            return(
              <CardCliente key={item.id} nome={item.nome} onPress={() => goToClientePage(item.id, item.nome)}/>
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
  }
})

export default HomeScreen