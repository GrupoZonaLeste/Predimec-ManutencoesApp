import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, Alert, RefreshControl, Image, ScrollView } from "react-native"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import ButtonBack from '../components/ButtonBack';
import ButtonDelete from '../components/ButtonDelete';
import CardEquipamento from '../components/CardEquipamento';
import Divider from '../components/Divider';
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'
import Button from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';
import { shadow } from '../constants/Effects';
import { getClienteTemplate, getManutencaoTemplate } from '../mock/objectTemplates';
import { formatarData } from '../utils/conversorData';

import { MANUTENCAO_ROUTES } from '../api/endpoints';
import { EQUIPAMENTO_ROUTES } from '../api/endpoints';

const ManutencaoScreen = ({route}) => {
  const { usuario } = useContext(AuthContext)
  const { id_manutencao} = route.params

  const [clienteObj, setClienteObj] = useState(getClienteTemplate())
  const [manutencaoObj, setManutencaoObj] = useState(getManutencaoTemplate())

  // API - Manutencao
  const buscarManutencaoAPI = async () => {
    try{
      const resposta_api = await fetch(MANUTENCAO_ROUTES.GET_ONE_MANUTENCAO(id_manutencao), {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
        }
      })

      if(resposta_api.ok){
        const dados = await resposta_api.json()
        setManutencaoObj(dados)
      } else {
        Alert.alert("Erro", "Erro ao buscar manutenção")
      }
    } catch(erro){
      console.error('Erro ao buscar manutenção:', erro);
    }
  }

  const deletarManutencaoAPI = async () => {
    try{
      const resposta_api = await fetch(MANUTENCAO_ROUTES.DELETE_MANUTENCAO(id_manutencao), {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
        }
      })

      if(resposta_api.ok){
        Alert.alert("Sucesso", "Manutenção excluida com sucesso")
        navigation.goBack()
      } else {
        Alert.alert("Erro", "Erro ao excluir manutenção")
      }
    } catch(erro){
      console.error('Erro ao deletar cliente:', erro);
    }
  }

  const confirmarDeletar = () => {
    Alert.alert(
      '',
      'Tem certeza que deseja deletar a manutenção? Todas os dados serão perdidos',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deletarManutencaoAPI()
          },
        },
      ],
      { cancelable: false }
    );
  }

  // API - Equipamento
  const criarEquipamentoAPI = async () => {
    try{
      const dataAtual = new Date();

      const resposta_api = await fetch(EQUIPAMENTO_ROUTES.POST_EQUIPAMENTO, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
        },
        body: JSON.stringify({
          data_criacao: dataAtual.toISOString(),
          nome: "Novo Equipamento",
          descricao: "",
          manutencao_id: id_manutencao
        })
      })

      if(resposta_api.ok){
        const res = await resposta_api.json()
        
        navigation.navigate('ClienteStack', {
          screen: 'VerEquipamento',
          params: {
            id_manutencao: id_manutencao,
            id_equipamento: res.id
          }
        })
      } else {
        Alert.alert("Erro", "Erro ao criar equipamento")
      }

    } catch(erro){
      Alert.alert("Erro", "Erro ao criar equipamento")
      console.error('Erro ao criar equipamento:', erro);
    }
  }

  // estado e função para efetuar recarregamento de lista
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)

    setTimeout(() => {
      buscarManutencaoAPI()
      setRefreshing(false)
    }, 500)
  }

  // navegação
  const navigation = useNavigation()

  const goToVerEquipamento = (id_equipamento) => {
    navigation.navigate('ClienteStack', {
      screen: 'VerEquipamento',
      params: {
        id_equipamento: id_equipamento
      }
    })
  }

  // Renderizacao e re-render
  const focused = useIsFocused()

  useEffect(() => {
    buscarManutencaoAPI()
  },[focused])

  return(
    <View style={styles.mainContainer}>

      <View style={{flex: 'auto', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <ButtonBack onPress={() => navigation.goBack()}/>
        <View style={{flex: 'auto', flexDirection: 'row-reverse', width: '30%', alignItems: 'center', justifyContent: 'space-between'}}>
          <ButtonDelete onPress={confirmarDeletar}/>
        </View>
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.nomeManutencao}>{formatarData(manutencaoObj.data_criacao)}</Text>
        <Text numberOfLines={1} style={styles.nomeFuncionario}>
          Criador: {manutencaoObj.funcionario}
        </Text>
        <Button 
          title='Novo Equipamento'
          containerStyle={{width: '100%', marginVertical: spacing.medium}}
          onPress={criarEquipamentoAPI}
        />
        <Divider/>
      </View>

      <View style={{flexGrow: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.tituloSecao}>Equipamentos</Text>

        {manutencaoObj?.equipamentos?.length == 0 ? (
          <ScrollView 
            style={[{flex: 1}, shadow, styles.nenhumEquipContainer]} 
            contentContainerStyle={{height: '100%', alignItems: 'center', justifyContent: 'center'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
            }
          >
            <Image 
              style={styles.imgNenhumEquip}
              source={require('../../assets/images/imagem_nenhum_equipamento.png')} 
            />
            <Text style={styles.textoNenhumEquip}>Não há equipamentos cadastrados</Text>
          </ScrollView>
        ) : (
          <FlatList 
            data={manutencaoObj.equipamentos}
            style={[{flex: 1}, shadow, styles.equipamentosContainer]}
            contentContainerStyle={{paddingVertical: spacing.small}}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <CardEquipamento 
                id={item.id}
                nome={item.nome}
                criacao={formatarData(item.data_criacao)}
                onPress={() => goToVerEquipamento(item.id)}
              />
            )}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={true}
          />
        )}
        
        
       

        <Divider/>
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Button 
          title='Gerar Relatório'
          containerStyle={{width: '100%', marginVertical: spacing.medium}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'green',
    padding: spacing.xlarge,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  equipamentosContainer: {
    width: "100%",
    backgroundColor: colors.white,
    margin: spacing.medium,
    borderWidth: 1,
    paddingHorizontal: spacing.large,
    borderColor: colors.gray,
    borderRadius: 8,
  },
  nenhumEquipContainer: { 
    width: '100%', 
    backgroundColor: colors.white,
    margin: spacing.medium,
    borderWidth: 1,
    paddingHorizontal: spacing.large,
    borderColor: colors.gray,
    borderRadius: 8,
  },
  imgNenhumEquip: {
    width: 600 / 4,
    height: 512 / 4,
    opacity: 0.8,
    marginVertical: spacing.medium,
  },
  textoNenhumEquip: {
    color: colors.darkGray,
    fontFamily: 'Inter-Regular',
    fontSize: fontSizes.medium,
    width: '75%',
    textAlign: 'center',
    marginVertical: spacing.medium,
  }
})

export default ManutencaoScreen