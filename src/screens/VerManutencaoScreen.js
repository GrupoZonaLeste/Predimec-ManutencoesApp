import React, {useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, FlatList, Alert, RefreshControl} from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AdicionarFotoModal from '../modals/AdicionarFotoModal';
import ButtonBack from '../components/ButtonBack';
import ButtonAdd from '../components/ButtonAdd';
import ButtonDelete from '../components/ButtonDelete';
import ButtonEdit from '../components/ButtonEdit';
import CardFotosAntesDepois from '../components/CardFotosAntesDepois';
import Chip from '../components/Chip';
import Divider from '../components/Divider';
import TextDisplay from '../components/TextDisplay';
import TextInput from '../components/TextInput';
import VerFotoModal from '../modals/VerFotoModal';
import database from '../mock/database.json'
import { getManutencaoTemplate, getClienteTemplate, getFotoTemplate } from '../mock/objectTemplates';
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'
import Button from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';

const VerManutencaoScreen = ({route}) => {
  const { usuario } = useContext(AuthContext)
  const {id_cliente, id_manutencao} = route.params
  
  const navigation = useNavigation()

  // estado e função para efetuar recarregamento de lista
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)

    setTimeout(() => {
      let cliente = database.Clientes.find(cliente => cliente.id == id_cliente)
      setClienteObj(cliente)

      let manutencao = cliente.manutencoes.find(manutencao => manutencao.id == id_manutencao)
      
      setManutencaoObj(manutencao)
      setNewManutencaoObj(manutencao)
      setListaEditFotos(manutencao.fotos)
      setListaEditTrocas(manutencao.trocas.split(";"))
      setListaChips(manutencao.trocas.split(";"))
      setIsEditMode(false)
      
      setRefreshing(false)
    }, 500)
  }

  // modal adicionar foto usado no modo de edição
  const [modalNovaFoto, setModalNovaFoto] = useState(false)

  // modal de ver foto em tela cheia
  const [modalVerFoto, setModalVerFoto] = useState(false)
  const [fotoSelecionada, setFotoSelecionada] = useState(getFotoTemplate())

  // função para informar ao modal de ver foto qual foto foi selecionada
  const handleVerFoto = (fotoObj) => {
    setFotoSelecionada(fotoObj) 
    setModalVerFoto(true)
  }

  // Dados do cliente e da manutenção
  const [clienteObj, setClienteObj] = useState(getClienteTemplate())
  const [manutencaoObj, setManutencaoObj] = useState(getManutencaoTemplate())

  // Lista de chips (trocas) adicionados pelo usuario e texto do input "Outro..." no modo de edição
  const [listaChips, setListaChips] = useState([])
  const [customChip, setCustomChip] = useState("")

  /* Adiciona nova opção de Troca na lista disponivel */
  const addNovoChip = () => {
    if(customChip != ""){
      setListaChips([...listaChips, customChip])
    }
    setListaEditTrocas([...listaEditTrocas, customChip])
    setCustomChip("")
  }

  // Estado que define se a tela está em modo de edição ou não
  const [isEditMode, setIsEditMode] = useState(false)

  // Dados da versão editada da manutenção
  const [newManutencaoObj, setNewManutencaoObj] = useState(getManutencaoTemplate())
  const [listaEditTrocas, setListaEditTrocas] = useState([])
  const [listaEditFotos, setListaEditFotos] = useState([])
 
  const salvarAlteracao = () => {
    if(newManutencaoObj.conjunto == ""){
      Alert.alert("Erro", "Preencha o campo Conjunto")
      return
    }

    if(newManutencaoObj.tag == ""){
      Alert.alert("Erro", "Preencha o campo Tag")
      return
    }

    if(listaEditTrocas.length == 0){
      Alert.alert("Erro", "Informe quais trocas foram feitas")
      return
    }

    let string_trocas = ""

    // montando a string das trocas 
    for(let i = 0; i < listaEditTrocas.length; i++){
      if(i == (listaEditTrocas.length - 1)){
        string_trocas += listaEditTrocas[i]
      } else {
        string_trocas += listaEditTrocas[i]+";"
      }
    }

    // manutencao editada
    const novaManutencao = {
      "id": id_manutencao,
      "data": newManutencaoObj.data,
      "funcionario": newManutencaoObj.funcionario,
      "conjunto": newManutencaoObj.conjunto,
      "tag": newManutencaoObj.tag,
      "trocas": string_trocas,
      "fotos": listaEditFotos
    }

    /* FAZER AQUI O POST/PUT PARA ATUALIZAR A MANUTENCAO */
    let listaAtualizada = clienteObj.manutencoes.filter(item => item.id != id_manutencao)
    listaAtualizada.push(novaManutencao)

    // Ordenando a lista (Só precisa fazer pro JSON)
    // Ordenação decrescente (Mais novo primeiro)
    listaAtualizada.sort((a, b) => a.id - b.id)

    clienteObj.manutencoes = listaAtualizada
    
    Alert.alert("Sucesso", "Manutenção criada com sucesso")
    setUpdateFlag(updateFlag => updateFlag + 1)
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
      'Tem certeza que deseja deletar a manutenção? ',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
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

  // Renderização do conteudo da manutencao e re-render
  const focused = useIsFocused()
  const [updateFlag, setUpdateFlag] = useState(0)

  useEffect(() => {
    // FAZER UM GET PARA PUXAR O CLIENTE DO BANCO
    let cliente = database.Clientes.find(cliente => cliente.id == id_cliente)
    setClienteObj(cliente)

    // FAZER UM GET PARA PUXAR A MANUTENCAO DO BANCO
    let manutencao = cliente.manutencoes.find(manutencao => manutencao.id == id_manutencao)
    
    setManutencaoObj(manutencao)
    setNewManutencaoObj(manutencao)
    setListaEditFotos(manutencao.fotos)
    setListaEditTrocas(manutencao.trocas.split(";"))
    setListaChips(manutencao.trocas.split(";"))
    setIsEditMode(false)
  }, [focused, updateFlag])

  // Checagem de permissão pra editar. Os botões de editar e excluir só aparecem pro criador da manutenção e pro admin
  const permissaoEditar = (usuario.nome == manutencaoObj.funcionario || usuario.tipo == "admin")

  const containerEditStyle = isEditMode ?
    ({borderWidth: 8, borderColor: colors.yellow}) :
    ({borderWidth: 0, borderColor: 'transparent'})

  return(
    <ScrollView 
      style={[styles.mainContainer, containerEditStyle]} 
      contentContainerStyle={styles.mainContainerAlignment}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
      }
    >
      <AdicionarFotoModal 
        modalVisible={modalNovaFoto} 
        setModalVisible={setModalNovaFoto} 
        list={listaEditFotos} 
        setList={setListaEditFotos}
      />

      <VerFotoModal 
        modalVisible={modalVerFoto}
        setModalVisible={setModalVerFoto}
        fotoObj={fotoSelecionada}
      />

      <View style={{flex: 'auto', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <ButtonBack onPress={() => navigation.goBack()}/>
        <View style={{flex: 'auto', flexDirection: 'row-reverse', width: '30%', alignItems: 'center', justifyContent: 'space-between'}}>
          {permissaoEditar && (
            <>
              <ButtonDelete onPress={confirmarDeletar} />
              <ButtonEdit isSelected={isEditMode} onPress={() => setIsEditMode(!isEditMode)}/>
            </>
          )}
        </View>
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        {isEditMode && (
          <>
            <Button title="Salvar Alterações" containerStyle={{width: '100%'}} onPress={salvarAlteracao} />
            <Divider />
          </>
        )}
        <Text style={styles.nomeManutencao}>{manutencaoObj.data}</Text>
        <Text style={styles.nomeFuncionario}>Criador: {manutencaoObj.funcionario}</Text>
        <Divider/>
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={styles.linha}>
          <Text style={styles.tituloSecao}>Relatório</Text>
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>Conjunto</Text>
          {isEditMode ? (
            <TextInput 
              placeholder="Digite o conjunto..."
              value={newManutencaoObj.conjunto}
              onChangeText={(text) => setNewManutencaoObj(obj => ({...obj, "conjunto": text}))}
            />
          ) : (
            <TextDisplay>{manutencaoObj.conjunto}</TextDisplay>
          )}
          
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>TAG</Text>
          {isEditMode ? (
            <TextInput 
              placeholder="Digite o conjunto..."
              value={newManutencaoObj.tag}
              onChangeText={(text) => setNewManutencaoObj(obj => ({...obj, "tag": text}))}
            />
          ) : (
            <TextDisplay>{manutencaoObj.tag}</TextDisplay>
          )}
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>Trocas</Text>
          {isEditMode ? (
            <>
              <FlatList
                data={listaChips}
                style={{flex: 1, width: "100%"}}
                contentContainerStyle={{flex: 1, width: '100%'}}
                keyExtractor={(item, idx) => idx}
                renderItem={({item,}) => (
                  <Chip 
                    list={listaEditTrocas} 
                    setList={setListaEditTrocas} 
                    isSelected={listaEditTrocas ? true : false}
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
            </>
          ) : (
            <FlatList
              style={[styles.chipContainer]}
              data={manutencaoObj.trocas.split(";")}
              keyExtractor={(item, idx) => idx}
              renderItem={({item,}) => (
                <Chip 
                  readOnly
                >
                  {item}
                </Chip>  
              )}
              scrollEnabled={false}
              showsVerticalScrollIndicator={true}
            />
          )}
          
          <Divider/>
        </View>

        <View style={[styles.linha, {flexDirection: 'row', justifyContent: 'space-between'}]}>
          <Text style={styles.tituloSecao}>Fotos</Text>
          {isEditMode && (
            <ButtonAdd onPress={() => setModalNovaFoto(true)} />
          )}
        </View>

        <View style={styles.linha}>
          {isEditMode ? (
            listaEditFotos != undefined ? (
              listaEditFotos.map((obj) => {
                return( 
                  <CardFotosAntesDepois 
                    key={obj.id}
                    id={obj.id}
                    fotoAntes={obj.fotoAntes}
                    legendaAntes={obj.legendaAntes}
                    fotoDepois={obj.fotoDepois}
                    legendaDepois={obj.legendaDepois}
                    list={listaEditFotos}
                    setList={setListaEditFotos}
                    isEditable={true}
                    onPress={() => handleVerFoto(obj)}
                  />
                )
              })
            ) : (null)
          ) : (
            manutencaoObj.fotos.map((obj) => {
              return( 
                <CardFotosAntesDepois 
                  key={obj.id}
                  id={obj.id}
                  fotoAntes={obj.fotoAntes}
                  legendaAntes={obj.legendaAntes}
                  fotoDepois={obj.fotoDepois}
                  legendaDepois={obj.legendaDepois}
                  onPress={() => handleVerFoto(obj)}
                />
              )
            })
          )}

        </View>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'green',
    padding: spacing.xlarge,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.white,
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
  },
})

export default VerManutencaoScreen