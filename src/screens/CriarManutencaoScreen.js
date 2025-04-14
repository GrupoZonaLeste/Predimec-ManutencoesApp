import React, {useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, Alert, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import ButtonAdd from '../components/ButtonAdd';
import ButtonShare from '../components/ButtonShare'
import ButtonBack from '../components/ButtonBack';
import Button from '../components/Button';
import CardFotosAntesDepois from '../components/CardFotosAntesDepois';
import Chip from '../components/Chip';
import Divider from '../components/Divider';
import AdicionarFotoModal from '../modals/AdicionarFotoModal';
import Foto from '../components/Foto'
import TextInput from '../components/TextInput';
import database from '../mock/database.json'
import { getClienteTemplate, getManutencaoTemplate, getFotoTemplate} from '../mock/objectTemplates'
import { fontSizes } from '../constants/Fonts'
import { spacing } from '../constants/Spacing'
import { colors } from '../constants/Colors'

const CriarManutencaoScreen = ({route}) => {
  const { id } = route.params
  const { usuario } = useContext(AuthContext)

  const navigation = useNavigation()

  // modal adicionar foto
  const [modalNovaFoto, setModalNovaFoto] = useState(false)

  // Lista de chips adicionados pelo usuario e texto do input "Outro..." na seção Trocas
  const [listaChips, setListaChips] = useState(["Eixo", "Mancal","Rolamento","Polia"])
  const [customChip, setCustomChip] = useState("")

  /* Adiciona nova opção de Troca na lista disponivel */
  const addNovoChip = () => {
    if(customChip != ""){
      setListaChips([...listaChips, customChip])
    }
    setCustomChip("")
  }

  // Dados da nova manutenção
  const [clienteObj, setClienteObj] = useState(getClienteTemplate())
  const [manutencaoObj, setManutencaoObj] = useState(getManutencaoTemplate())
  const [listaTrocas, setListaTrocas] = useState([])
  const [listaFotos, setListaFotos] = useState([])

  const criarNovaManutencao = () => {
    if(manutencaoObj.conjunto == ""){
      Alert.alert("Erro", "Preencha o campo Conjunto")
      return
    }

    if(manutencaoObj.tag == ""){
      Alert.alert("Erro", "Preencha o campo Tag")
      return
    }

    if(listaTrocas.length == 0){
      Alert.alert("Erro", "Informe quais trocas foram feitas")
      return
    }

    let string_trocas = ""

    // montando a string das trocas 
    for(let i = 0; i < listaTrocas.length; i++){
      if(i == (listaTrocas.length - 1)){
        string_trocas += listaTrocas[i]
      } else {
        string_trocas += listaTrocas[i]+";"
      }
    }

    // buscando a ultima manutencao feita pra gerar um id
    const cliente = database.Clientes.find(cliente => cliente.id == id)
    const listaManutencoes = cliente.manutencoes
    
    let newId = 0;
    if(listaManutencoes.length > 0){
      const ultimoId = listaManutencoes[listaManutencoes.length - 1].id

      if(ultimoId){
        newId = parseInt(ultimoId) + 1
      } 
    } else {
      newId = parseInt(1)
    }

    const novaManutencao = {
      "id": newId,
      "data": manutencaoObj.data,
      "funcionario": usuario.nome,
      "conjunto": manutencaoObj.conjunto,
      "tag": manutencaoObj.tag,
      "trocas": string_trocas,
      "fotos": listaFotos
    }

    /* POST PARA SALVAR A NOVA MANUTENCAO */
    clienteObj.manutencoes.push(novaManutencao)
    
    Alert.alert("Sucesso", "Manutenção criada com sucesso")
    navigation.goBack()
  } 

  useEffect(() => {
    setClienteObj(database.Clientes.find(cliente => cliente.id == id))

    let dataAtual = new Date(Date.now()).toLocaleDateString()
    let horaAtual = new Date(Date.now()).toLocaleTimeString()

    let dataHora = `${dataAtual} - ${horaAtual}`

    setManutencaoObj(obj => ({
      ...obj,
      "data": dataHora
    }))
  }, [])
  
  return(
    <ScrollView style={styles.mainContainer} contentContainerStyle={styles.mainContainerAlignment}>
      <AdicionarFotoModal 
        modalVisible={modalNovaFoto} 
        setModalVisible={setModalNovaFoto} 
        list={listaFotos} 
        setList={setListaFotos}
      />

      <View style={{flex: 'auto', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <ButtonBack onPress={() => navigation.goBack()}/>
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.tituloPagina}>Nova Manutenção</Text>
        <Text style={styles.nomeCliente}>{clienteObj.nome}</Text>
        <Text style={styles.nomeManutencao}>{manutencaoObj.data}</Text>
        <Text style={styles.nomeFuncionario}>Criador: {usuario.nome}</Text>
        <Divider/>
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={styles.linha}>
          <Text style={styles.tituloSecao}>Relatório</Text>
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>Conjunto</Text>
          <TextInput 
            placeholder="Digite o conjunto..." 
            onChangeText={(text) => setManutencaoObj(obj => ({...obj, "conjunto": text}))}
          />
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>TAG</Text>
          <TextInput 
            placeholder="Digite a TAG..." 
            onChangeText={(text) => setManutencaoObj(obj => ({...obj, "tag":text}))}
          />  
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>Trocas</Text>
          <FlatList
            data={listaChips}
            style={{flex: 1, width: "100%"}}
            contentContainerStyle={{flex: 1, width: '100%'}}
            keyExtractor={(item, idx) => idx}
            renderItem={({item,}) => (
              <Chip 
                list={listaTrocas} 
                setList={setListaTrocas} 
              >
                {item}
              </Chip>  
            )}
            scrollEnabled={false}
            showsVerticalScrollIndicator={true}
          />

          {/* INPUT DE ADD NOVAS TROCAS */}
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
        </View>

        <View style={[styles.linha, {flexDirection: 'row', justifyContent: 'space-between'}]}>
          <Text style={styles.tituloSecao}>Fotos</Text>
          <ButtonAdd onPress={() => setModalNovaFoto(true)} />
        </View>

        <View style={styles.linha}>
          <FlatList
            data={listaFotos}
            keyExtractor={(item, idx) => idx}
            renderItem={({item,}) => (
              <CardFotosAntesDepois 
                fotoAntes={item.fotoAntes}
                legendaAntes={item.legendaAntes}
                fotoDepois={item.fotoDepois}
                legendaDepois={item.legendaDepois}
              />
            )}
            scrollEnabled={false}
            showsVerticalScrollIndicator={true}
          />
          <Divider />
        </View>

        <View style={styles.linha}>
          <Button title='Criar Nova Manutenção' onPress={criarNovaManutencao} />
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
  tituloPagina:{
    alignSelf: 'baseline',
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.xlarge,
  },
  nomeCliente: {
    alignSelf: 'baseline',
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.large,
  },
  nomeManutencao: {
    alignSelf: 'baseline',
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.large,
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
  }
})

export default CriarManutencaoScreen