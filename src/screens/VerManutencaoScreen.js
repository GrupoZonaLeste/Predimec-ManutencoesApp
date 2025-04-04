import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ButtonShare from '../components/ButtonShare'
import ButtonBack from '../components/ButtonBack';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Divider from '../components/Divider';
import Foto from '../components/Foto'
import TextDisplay from '../components/TextDisplay';
import database from '../mock/database.json'
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'

const VerManutencaoScreen = ({route}) => {
  const {id, nome} = route.params

  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }
  
  const [nomeManutencao, setNomeManutencao] = useState('')
  const [nomeFuncionario, setNomeFuncionario] = useState('')
  const [dataCriacao, setDataCriacao] = useState('')

  useEffect(() => {
    const fetchGetDados = (id) => {
      let dataMock = new Date(Date.now()).toLocaleDateString()
      /**
       * Fazer o GET com o id da manutencao e carregar os dados
       */
      setNomeManutencao('11/01/2010')
      setNomeFuncionario('Funcionario 1')
      setDataCriacao(dataMock)
    }

    fetchGetDados()
  }, [])
  

  return(
    <ScrollView style={styles.mainContainer} contentContainerStyle={styles.mainContainerAlignment}>
      <View style={{flex: 'auto', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <ButtonBack onPress={goBack}/>
        <ButtonShare  onPress={() => alert('Compartilhar')} />
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.nomeManutencao}>{nomeManutencao}</Text>
        <Text style={styles.nomeFuncionario}>{nomeFuncionario}</Text>
        <Text style={styles.dataCriacao}>Criado em: {dataCriacao}</Text>
        <Divider/>
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={styles.linha}>
          <Text style={styles.tituloSecao}>Relatório</Text>
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>Conjunto</Text>
          <TextDisplay> </TextDisplay>
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>TAG</Text>
          <TextDisplay> </TextDisplay>
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>Trocas</Text>
          <View style={styles.chipContainer}>
            <Chip readOnly={true}>Eixo</Chip>
            <Chip readOnly={true}>Mancal</Chip>
            <Chip readOnly={true}>Rolamento</Chip>
            <Chip readOnly={true}>Polia</Chip>
            <Chip readOnly={true}>ABCD</Chip>
          </View>
          <Divider/>
        </View>

        <View style={[styles.linha, {flexDirection: 'row', justifyContent: 'space-between'}]}>
          <Text style={styles.tituloSecao}>Fotos</Text>
        </View>

        <View style={styles.linha}>
          <View style={styles.linhaFoto}>
            <View style={{flex: 0.45, justifyContent: 'center'}}>
              <Text style={styles.label}>Antes</Text>
              <Foto />
              <Text numberOfLines={2} style={styles.legenda}>exemplo de legenda longa exemplo de legenda longa </Text>
            </View>

            <View style={{flex: 0.45}}>
              <Text style={styles.label}>Depois</Text>
              <Foto />
              <Text numberOfLines={2} style={styles.legenda}>legenda</Text>
            </View>
          </View>

          <View style={styles.linhaFoto}>
            <View style={{flex: 0.45, justifyContent: 'center'}}>
              <Text style={styles.label}>Antes</Text>
              <Foto />
              <Text numberOfLines={2} style={styles.legenda}>exemplo de legenda longa exemplo de legenda longa </Text>
            </View>

            <View style={{flex: 0.45}}>
              <Text style={styles.label}>Depois</Text>
              <Foto />
              <Text numberOfLines={2} style={styles.legenda}>legenda</Text>
            </View>
          </View>

          <View style={styles.linhaFoto}>
            <View style={{flex: 0.45, justifyContent: 'center'}}>
              <Text style={styles.label}>Antes</Text>
              <Foto />
              <Text numberOfLines={2} style={styles.legenda}>exemplo de legenda longa exemplo de legenda longa </Text>
            </View>

            <View style={{flex: 0.45}}>
              <Text style={styles.label}>Depois</Text>
              <Foto />
              <Text numberOfLines={2} style={styles.legenda}>legenda</Text>
            </View>
          </View>


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