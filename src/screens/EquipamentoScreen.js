import React, {useState, useEffect, useContext, useRef} from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, Alert, RefreshControl, ScrollView } from "react-native"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import FontAwesome from '@expo/vector-icons/FontAwesome';

import AdicionarTrocaModal from '../modals/AdicionarTrocaModal';
import ButtonAdd from '../components/ButtonAdd';
import ButtonBack from '../components/ButtonBack';
import ButtonDelete from '../components/ButtonDelete';
import ButtonFloating from '../components/ButtonFloating';
import CarregandoModal from '../modals/CarregandoModal';
import CardFoto from '../components/CardFoto';
import CardTroca from '../components/CardTroca'
import Divider from '../components/Divider';
import TextInput from '../components/TextInput';
import VerFotoModal from '../modals/VerFotoModal';

import { tirarFotoBase64 } from '../utils/fotoUtils';
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'
import { AuthContext } from '../contexts/AuthContext';
import { formatarData } from '../utils/conversorData';

import { EQUIPAMENTO_ROUTES } from '../api/endpoints'; 

const EquipamentoScreen = ({route}) => {
  const { usuario } = useContext(AuthContext)
  const { id_equipamento} = route.params

  // navegacao
  const navigation = useNavigation()

  // função de tirar foto e descer a tela
  const scrollViewRef = useRef();

  const buscarEquipamentoAPI = async () => {
    try{
      
      const resposta_api = await fetch(EQUIPAMENTO_ROUTES.GET_ONE_EQUIPAMENTO(id_equipamento), {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
        }
      })

      if(resposta_api.ok){
        const dados = await resposta_api.json()

        setEquipData(formatarData(dados.data_criacao))
        setEquipNome(dados.nome)
        setEquipDesc(dados.descricao)
        setEquipFotos(dados.fotos)
        setEquipTrocas(dados.trocas)
      } else {
        Alert.alert("Erro", "Erro ao buscar equipamento")
      }
    } catch(erro){
      console.error('Erro ao buscar equipamento:', erro);
    }
  }

  const deletarEquipamentoAPI = async () => {
    try{
      const resposta_api = await fetch(EQUIPAMENTO_ROUTES.DELETE_EQUIPAMENTO(id_equipamento), {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario.token}`
        }
      })

      if(resposta_api.ok){
        Alert.alert("Sucesso", "Equipamento excluido com sucesso")
        navigation.goBack()
      } else {
        Alert.alert("Erro", "Erro ao excluir equipamento")
      }
    } catch(erro){
      console.error('Erro ao deletar equipamento:', erro);
    }
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
            deletarEquipamentoAPI()
          },
        },
      ],
      { cancelable: false }
    );
  }

  // tirar foto (placeholder)
  const handleTirarFoto = async () => {
    setCarregando(true)
    await tirarFotoBase64({list: equipFotos, setList: setEquipFotos})
    scrollViewRef.current.scrollToEnd({ animated: true })
    setCarregando(false)
  }

  // Salvar mudanças
  /*
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
  */

  // dados do equipamento
  const [equipData, setEquipData] = useState("")
  const [equipNome, setEquipNome] = useState("")
  const [equipDesc, setEquipDesc] = useState("")
  const [equipTrocas, setEquipTrocas] = useState([])
  const [equipFotos, setEquipFotos] = useState([])  


  // useEffect para salvar mudanças e evento pros text inputs
  /*
  useEffect(() => {
    salvarAlterações()
  }, [equipTrocas, equipFotos])
  
  const onBlurSalvar = () => {
    salvarAlterações()
  }
  */

  // modal adicionar troca
  const [novaTrocaMoodal, setNovaTrocaModal] = useState(false)

  // modal carregamento
  const [carregando, setCarregando] = useState(false) 
  
  // modal de ver foto e estado fotoselecionada
  const [verFoto, setVerFoto] = useState(false)
  const [fotoSelecionada, setFotoSelecionada] = useState("")

  // função para adicionar alterações de uma troca
  const handleTrocaChange = (index, novaTroca) => {
    setEquipTrocas(prev => {
      const novaLista = [...prev]
      novaLista[index] = novaTroca
      return novaLista
    })
  }

  // renderizacao e re-render
  const focused = useIsFocused()

  useEffect(() => {
    buscarEquipamentoAPI()
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

        <AdicionarTrocaModal 
          modalVisible={novaTrocaMoodal}
          setModalVisible={setNovaTrocaModal}
          list={equipTrocas}
          setList={setEquipTrocas}
        />

        <View style={{flex: 'auto', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
          <ButtonBack onPress={() => navigation.goBack()}/>
          <View style={{flex: 'auto', flexDirection: 'row-reverse', width: '30%', alignItems: 'center', justifyContent: 'space-between'}}>
            <ButtonDelete onPress={confirmarDeletar}/>
          </View>
        </View>

        <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
          <Text numberOfLines={1} style={styles.dataCriacao}>Criado em: {equipData}</Text>

          <Divider/>
          
          <Text style={styles.label}>Nome</Text>
          <TextInput 
            placeholder="Digite um nome..."
            value={equipNome}
            onChangeText={setEquipNome}
            containerStyle={{width: '100%', marginVertical: spacing.small}}
            style={styles.inputNome}
          />
  
          <Text style={styles.label}>Descrição</Text>
          <TextInput 
            placeholder="Digite uma descrição..."
            value={equipDesc}
            onChangeText={setEquipDesc}
            containerStyle={{width: '100%', maxHeight: 150, marginVertical: spacing.small}}
            style={styles.inputDescricao}
            multiline
          />

          <Divider/>

          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: spacing.small}}>
            <View style={{flexGrow: 1}}>
              <Text style={styles.label}>Trocas</Text>
            </View>
            <View style={{flex: 'auto'}}>
              <ButtonAdd onPress={() => setNovaTrocaModal(true)}/>
            </View>
          </View>

          {equipTrocas.map((troca, index) => {
            return(
              <CardTroca 
                key={index}
                trocaObj={troca}
                equipTrocas={equipTrocas} 
                setEquipTrocas={setEquipTrocas} 
                equipId={id_equipamento}
                setFotoSelecionada={setFotoSelecionada}
                setVerFoto={setVerFoto}
                onChange={(novaTroca) => handleTrocaChange(index, novaTroca)}
              />
            )
          })}

          <Divider/>

          <Text style={styles.label}>Fotos do Equipamento</Text>
        
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