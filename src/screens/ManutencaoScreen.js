import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, Alert, RefreshControl, Image, ScrollView } from "react-native"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import ButtonBack from '../components/ButtonBack';
import ButtonDelete from '../components/ButtonDelete';
import CardEquipamento from '../components/CardEquipamento';
import Divider from '../components/Divider';
import database from '../mock/database.json'
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'
import Button from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';
import { shadow } from '../constants/Effects';
import { getClienteTemplate, getManutencaoTemplate } from '../mock/objectTemplates';

const ManutencaoScreen = ({ route }) => {
  const relatorioendpoint = "http://192.168.0.107:3000/relatorio"
  const { usuario } = useContext(AuthContext)
  const { id_cliente, id_manutencao } = route.params

  const [clienteObj, setClienteObj] = useState(getClienteTemplate())
  const [manutencaoObj, setManutencaoObj] = useState(getManutencaoTemplate())

  // estado e função para efetuar recarregamento de lista
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)

    setTimeout(() => {
      carregadorDados()
      setRefreshing(false)
    }, 500)
  }

  // navegação
  const navigation = useNavigation()

  const goToVerEquipamento = (id_equipamento) => {
    let listaManutencoes = clienteObj.manutencoes

    navigation.navigate('ClienteStack', {
      screen: 'VerEquipamento',
      params: {
        lista_manutencoes: listaManutencoes,
        id_manutencao: id_manutencao,
        id_equipamento: id_equipamento
      }
    })
  }

  const deletarManutencao = () => {
    // FAZER O FETCH COM DELETE AQUI PARA APAGAR A MANUTENCAO
    let listaAtualizada = clienteObj.manutencoes.filter(item => item.id != id_manutencao)
    clienteObj.manutencoes = listaAtualizada
    Alert.alert("", "A manutenção foi deletada com sucesso")
    navigation.goBack()
  }

  const confirmarDeletar = () => {
    Alert.alert(
      '',
      'Tem certeza que deseja deletar a manutenção? Todas os dados serão perdidos',
      [
        {
          text: 'Cancelar',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deletarManutencao()
          },
        },
      ],
      { cancelable: false }
    );
  }

  const criarEquipamento = () => {
    let listaEquipamentos = manutencaoObj.equipamentos

    // criando id da nova manutencao
    let newId = 0;
    if (listaEquipamentos.length > 0) {
      const ultimoId = listaEquipamentos[listaEquipamentos.length - 1].id

      if (ultimoId) {
        newId = parseInt(ultimoId) + 1
      }
    } else {
      newId = parseInt(1)
    }

    const novoEquipamento = {
      "id": newId,
      "nome": "Novo Equipamento",
      "data": new Date(Date.now()).toLocaleDateString('pt-BR'),
      "descricao": "",
      "trocas": [],
      "fotos": []
    }

    manutencaoObj.equipamentos.push(novoEquipamento)

    goToVerEquipamento(newId)
  }

  //GERANDO RELATÓRIO PARA TESTES

  const gerarRelatorio = () => {
    fetch(relatorioendpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "cliente": clienteObj.nome,
        "data": manutencaoObj.data,
        "conclusao": "conclusão teste.",
        "equipamentos": manutencaoObj.equipamentos
      })
    }).then(res => res.text()).then(res => console.log(res))
  }

  // função carregar dados
  const carregadorDados = () => {
    let cliente = database.Clientes.find(item => item.id == id_cliente)
    setClienteObj(cliente)

    let manutencao = cliente.manutencoes.find(item => item.id == id_manutencao)
    setManutencaoObj(manutencao)
  }
  // Renderizacao e re-render
  const focused = useIsFocused()

  useEffect(() => {
    carregadorDados()
  }, [focused])

  return (
    <View style={styles.mainContainer}>

      <View style={{ flex: 'auto', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <ButtonBack onPress={() => navigation.goBack()} />
        <View style={{ flex: 'auto', flexDirection: 'row-reverse', width: '30%', alignItems: 'center', justifyContent: 'space-between' }}>
          <ButtonDelete onPress={confirmarDeletar} />
        </View>
      </View>

      <View style={{ flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Text style={styles.nomeManutencao}>{manutencaoObj.data}</Text>
        <Text numberOfLines={1} style={styles.nomeFuncionario}>{manutencaoObj.funcionario}</Text>
        <Button
          title='Novo Equipamento'
          containerStyle={{ width: '100%', marginVertical: spacing.medium }}
          onPress={criarEquipamento}
        />
        <Divider />
      </View>

      <View style={{ flexGrow: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Text style={styles.tituloSecao}>Equipamentos</Text>

        {manutencaoObj.equipamentos.length == 0 ? (
          <ScrollView
            style={[{ flex: 1 }, shadow, styles.nenhumEquipContainer]}
            contentContainerStyle={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
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
            style={[{ flex: 1 }, shadow, styles.equipamentosContainer]}
            contentContainerStyle={{ paddingVertical: spacing.small }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardEquipamento
                id={item.id}
                nome={item.nome}
                criacao={item.data}
                onPress={() => goToVerEquipamento(item.id)}
              />
            )}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={true}
          />
        )}




        <Divider />
      </View>

      <View style={{ flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Button
          title='Gerar Relatório'
          containerStyle={{ width: '100%', marginVertical: spacing.medium }}
          onPress={gerarRelatorio}
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