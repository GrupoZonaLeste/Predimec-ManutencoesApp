import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import ButtonBack from '../components/ButtonBack';
import CardManutencao from '../components/CardManutencao';
import { shadow } from '../constants/Effects'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const ClienteScreen = ({route}) => {
  const {id, nome} = route.params

  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }

  const goToManutencaoScreen = (id, nome) => {
    navigation.navigate('ClienteStack', {
      screen: 'VerManutencao',
      params: {
        id: id,
        nome: nome
      }
    })
  }

  return(
    <View style={styles.mainContainer}>
      <View style={{flex: 'auto', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <ButtonBack onPress={goBack}/>
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.nomeCliente}>{nome}</Text>
        <Text style={styles.criadoEm}>Criado em 11/11/11</Text>
        <Button title='Nova Manutenção' containerStyle={{width: '100%', marginVertical: spacing.medium}}></Button>
      </View>

      <View style={{flexGrow: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.tituloManutencoes}>Manutenções</Text>
        <ScrollView style={[{flex: 1}, styles.manutenContainer, shadow]} persistentScrollbar={true}>
          <CardManutencao nome="05/00/0000" onPress={() => goToManutencaoScreen(1, "05/00/0000")}/>
          <CardManutencao nome="05/00/0000" onPress={() => goToManutencaoScreen(1, "05/00/0000")}/>
          <CardManutencao nome="05/00/0000" onPress={() => goToManutencaoScreen(1, "05/00/0000")}/>
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
  }
})

export default ClienteScreen