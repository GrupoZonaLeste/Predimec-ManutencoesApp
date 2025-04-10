import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../components/ButtonBack';
import ButtonDelete from '../components/ButtonDelete';
import ButtonEdit from '../components/ButtonEdit';
import CardFotosAntesDepois from '../components/CardFotosAntesDepois';
import Chip from '../components/Chip';
import Divider from '../components/Divider';
import TextDisplay from '../components/TextDisplay';
import database from '../mock/database.json'
import { getManutencaoTemplate } from '../mock/objectTemplates';
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'

const VerManutencaoScreen = ({route}) => {
  const {id_cliente, id_manutencao} = route.params
  const [manutencaoObj, setManutencaoObj] = useState(getManutencaoTemplate())

  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }
  
  useEffect(() => {
    let cliente = database.Clientes.find(cliente => cliente.id == id_cliente)
    let manutencao = cliente.manutencoes.find(manutencao => manutencao.id == id_manutencao)
    
    setManutencaoObj(manutencao)
  }, [])

  return(
    <ScrollView style={styles.mainContainer} contentContainerStyle={styles.mainContainerAlignment}>
      <View style={{flex: 'auto', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <ButtonBack onPress={goBack}/>
        <View style={{flex: 'auto', flexDirection: 'row', width: '30%', alignItems: 'center', justifyContent: 'space-between'}}>
          <ButtonEdit onPress={() => Alert.alert("EDITAR", "Editar")}/>
          <ButtonDelete onPress={() => Alert.alert("DELETAR", "Deletar")} />
        </View>
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.nomeManutencao}>{manutencaoObj.data}</Text>
        <Text style={styles.nomeFuncionario}>{manutencaoObj.funcionario}</Text>
        <Divider/>
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={styles.linha}>
          <Text style={styles.tituloSecao}>Relatório</Text>
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>Conjunto</Text>
          <TextDisplay>{manutencaoObj.conjunto}</TextDisplay>
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>TAG</Text>
          <TextDisplay>{manutencaoObj.tag}</TextDisplay>
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>Trocas</Text>
          <View style={styles.chipContainer}>
            {manutencaoObj.trocas.split(";").map((troca, idx) => {
              return <Chip key={idx} readOnly>{troca}</Chip>
            })}
          </View>
          <Divider/>
        </View>

        <View style={[styles.linha, {flexDirection: 'row', justifyContent: 'space-between'}]}>
          <Text style={styles.tituloSecao}>Fotos</Text>
        </View>

        <View style={styles.linha}>
          {
            manutencaoObj.fotos.map((obj, idx) => {
              return( 
                <CardFotosAntesDepois 
                  key={idx}
                  fotoAntes={obj.fotoAntes}
                  legendaAntes={obj.legendaAntes}
                  fotoDepois={obj.fotoDepois}
                  legendaDepois={obj.legendaDepois}
                />
              )
            })
          }




        </View>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'green',
    padding: spacing.xlarge,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.white
  },
  mainContainerAlignment: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: '12%',
  },
  nomeManutencao: {
    alignSelf: 'baseline',
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.xlarge,
  },
  nomeFuncionario: {
    alignSelf: 'baseline',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSizes.large,
  },
  dataCriacao: {
    alignSelf: 'baseline',
    fontFamily: 'Inter-Regular',
    fontSize: fontSizes.medium,
  },
  tituloSecao: {
    alignSelf: 'baseline',
    fontFamily: 'Inter-ExtraBold',
    fontSize: fontSizes.large,
  },
  linha: {
    width: '100%',
    marginVertical: spacing.small,
  },
  label: {
    alignSelf: 'stretch',
    fontFamily: 'Inter-Medium',
    fontSize: fontSizes.medium
  },
  chipContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  linhaFoto: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: 'space-between',
    padding: spacing.medium,
    marginVertical: spacing.small
  }
})

export default VerManutencaoScreen