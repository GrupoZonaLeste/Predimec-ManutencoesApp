import React, {useState, useEffect, useContext, useRef} from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, Alert, RefreshControl, ScrollView } from "react-native"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Button from '../components/Button';
import ButtonAdd from '../components/ButtonAdd';
import ButtonBack from '../components/ButtonBack';
import ButtonDelete from '../components/ButtonDelete';
import ButtonFloating from '../components/ButtonFloating';
import CarregandoModal from '../modals/CarregandoModal';
import CardFoto from '../components/CardFoto';
import Chip from '../components/Chip';
import Divider from '../components/Divider';
import TextInput from '../components/TextInput';
import VerFotoModal from '../modals/VerFotoModal';

import database from '../mock/database.json'
import { tirarFotoBase64 } from '../utils/fotoUtils';
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'
import { AuthContext } from '../contexts/AuthContext';
import { shadow } from '../constants/Effects';
import { getEquipamentoTemplate, getManutencaoTemplate } from '../mock/objectTemplates';

const unirListas = (arr1, arr2) => {
  let concatArr = arr1.concat(arr2)
  let result = concatArr.filter((item, idx) => concatArr.indexOf(item) === idx)
  return result
}

const EquipamentoScreen = ({route}) => {
  const { usuario } = useContext(AuthContext)
  const { lista_manutencoes, id_manutencao, id_equipamento} = route.params

  const [manutencaoObj, setManutencaoObj] = useState(getManutencaoTemplate())
  const [equipamentoObj, setEquipamentoObj] = useState(getEquipamentoTemplate())

  // Lista de chips (trocas) adicionados pelo usuario e texto do input "Outro..." no modo de edição
  const [listaChips, setListaChips] = useState([])
  const [customChip, setCustomChip] = useState("")

  /* Adiciona nova opção de Troca na lista disponivel */
  const addNovoChip = () => {
    if(customChip.length > 0 ){
      setListaChips(unirListas(listaChips, customChip))
      setEquipTrocas([...equipTrocas, customChip])
    }
    setCustomChip("")
  }

  // navegacao
  const navigation = useNavigation()

  // função de tirar foto e descer a tela
  const scrollViewRef = useRef();

  const handleTirarFoto = async () => {
    setCarregando(true)
    await tirarFotoBase64({list: equipFotos, setList: setEquipFotos})
    scrollViewRef.current.scrollToEnd({ animated: true })
    setCarregando(false)
  }

  // Salvar mudanças
  const salvarAlterações = () => {

    const equipamentoAtualizado = {
      "id": id_equipamento,
      "data": equipData,
      "nome": equipNome,
      "descricao": equipDesc,
      "trocas": equipTrocas,
      "fotos": equipFotos
    }

    let listaAtualizada = manutencaoObj.equipamentos.filter(item => item.id != id_equipamento)
    listaAtualizada.push(equipamentoAtualizado)

    listaAtualizada.sort((a,b) => a.id - b.id)

    manutencaoObj.equipamentos = listaAtualizada
  }

  // Excluir
  const deletarEquipamento = () => {
    // FAZER O FETCH COM DELETE AQUI PARA APAGAR A MANUTENCAO
    let listaAtualizada = manutencaoObj.equipamentos.filter(item => item.id != id_equipamento)
    manutencaoObj.equipamentos = listaAtualizada
    Alert.alert("", "O Equipamento foi deletado com sucesso")
    navigation.goBack()
  }
  
  const confirmarDeletar = () => {
    Alert.alert(
      '',
      'Tem certeza que deseja deletar o equipamento?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deletarEquipamento()
          },
        },
      ],
      { cancelable: false }
    );
  }

  // dados do equipamento
  const [equipData, setEquipData] = useState("")
  const [equipNome, setEquipNome] = useState("")
  const [equipDesc, setEquipDesc] = useState("")
  const [equipTrocas, setEquipTrocas] = useState([])
  const [equipFotos, setEquipFotos] = useState([])  


  // useEffect para salvar mudanças e evento pros text inputs
  useEffect(() => {
    salvarAlterações()
  }, [equipTrocas, equipFotos])

  const onBlurSalvar = () => {
    salvarAlterações()
  }

  // modal carregamento
  const [carregando, setCarregando] = useState(false) 
  
  // modal de ver foto e estado fotoselecionada
  const [verFoto, setVerFoto] = useState(false)
  const [fotoSelecionada, setFotoSelecionada] = useState("")

  // função de carregar dados
  const carregarDados = () => {
    let manutencao = lista_manutencoes.find(item => item.id == id_manutencao)
    setManutencaoObj(manutencao)

    let equipamento = manutencao.equipamentos.find(item => item.id == id_equipamento)
    setEquipamentoObj(equipamento)
    setEquipData(equipamento.data)
    setEquipNome(equipamento.nome)
    setEquipDesc(equipamento.descricao)
    setEquipFotos(equipamento.fotos)
    setEquipTrocas(equipamento.trocas)

    // Se ja há trocas feitas dentro do equipamento, não há necessidade de adicionar os chips das trocas padrão
    if(equipamento.trocas.length > 1){
      setListaChips(equipamento.trocas)
    } else {
      let listaTrocasPadrao = ["Eixo", "Mancal", "Polia", "Rolamento"]

      let listaUnificada = unirListas(equipamento.trocas, listaTrocasPadrao)
      setListaChips(listaUnificada)
    }
  }

  // renderizacao e re-render
  const focused = useIsFocused()

  useEffect(() => {
    carregarDados()
  }, [focused])

  return(
    <>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.mainContainerAlignment}
        ref={scrollViewRef}
      >
        <CarregandoModal 
          modalVisible={carregando}
          setModalVisible={setCarregando}
        />

        <VerFotoModal 
          modalVisible={verFoto}
          setModalVisible={setVerFoto}
          fotoSelecionada={fotoSelecionada}
        />

        <View style={{flex: 'auto', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
          <ButtonBack onPress={() => navigation.goBack()}/>
          <View style={{flex: 'auto', flexDirection: 'row-reverse', width: '30%', alignItems: 'center', justifyContent: 'space-between'}}>
            <ButtonDelete onPress={confirmarDeletar}/>
          </View>
        </View>

        <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
          <Text numberOfLines={1} style={styles.dataCriacao}>Criado em: {equipamentoObj.data}</Text>

          <Divider/>
          
          <Text style={styles.label}>Nome</Text>
          <TextInput 
            placeholder="Digite um nome..."
            value={equipNome}
            onChangeText={setEquipNome}
            containerStyle={{width: '100%', marginVertical: spacing.small}}
            style={styles.inputNome}
            onBlur={onBlurSalvar}
          />
  
          <Text style={styles.label}>Descrição</Text>
          <TextInput 
            placeholder="Digite uma descrição..."
            value={equipDesc}
            onChangeText={setEquipDesc}
            containerStyle={{width: '100%', maxHeight: 150, marginVertical: spacing.small}}
            style={styles.inputDescricao}
            multiline
            onBlur={onBlurSalvar}
          />

          <Divider/>

          <Text style={styles.label}>Trocas</Text>
          <FlatList
            data={listaChips}
            style={{flex: 1, width: "100%"}}
            contentContainerStyle={{flex: 1}}
            keyExtractor={(item) => item}
            renderItem={({item}) => (
              <Chip 
                renderList={listaChips}
                setRenderList={setListaChips}
                list={equipTrocas} 
                setList={setEquipTrocas} 
                isSelected={equipTrocas.includes(item) ? true : false}
              >
                {item}
              </Chip>  
            )}
            scrollEnabled={false}
            showsVerticalScrollIndicator={true}
          />
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-start', marginVertical: spacing.medium}}>
            <TextInput 
              placeholder="Outro..." 
              containerStyle={{width: '50%', marginHorizontal: spacing.small}}
              value={customChip}
              onChangeText={setCustomChip}
            />
            <ButtonAdd onPress={addNovoChip}/>
          </View>

          <Divider/>

          <Text style={styles.label}>Fotos</Text>
        
          <FlatList 
            data={equipFotos}
            style={{flex: 1, width: "100%"}}
            contentContainerStyle={{flex: 1}}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <CardFoto 
                id={item.id}
                list={equipFotos}
                setList={setEquipFotos}
                foto={item.foto}
                onPress={() => {
                  setFotoSelecionada(item.foto)
                  setVerFoto(true)
                }}
              />
            )}
            scrollEnabled={false}
            showsVerticalScrollIndicator={true}
          />

        </View>

        
      </ScrollView>
      <ButtonFloating onPress={handleTirarFoto}>
        <FontAwesome name="camera" size={28} color="black" style={{zIndex: 2}}/>
      </ButtonFloating>
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    flex: 1,
    padding: spacing.xlarge,
    paddingTop: StatusBar.currentHeight,
    
    backgroundColor: colors.white,
  },
  mainContainerAlignment: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: spacing.xlarge + 140,
  },
  nomeEquipamento: {
    alignSelf: 'baseline',
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.xlarge,
  },
  dataCriacao: {
    alignSelf: 'baseline',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSizes.large,
  },
  label: {
    alignSelf: 'baseline',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSizes.large,
  },
  inputNome: {
    fontFamily: 'Inter-SemiBold', 
    fontSize: fontSizes.medium, 
    minHeight: 50, 
    marginVertical: spacing.medium
  },
  inputDescricao: {
    fontFamily: 'Inter-Medium', 
    fontSize: fontSizes.medium, 
    height: 'auto', 
    marginVertical: spacing.medium
  }
})

export default EquipamentoScreen