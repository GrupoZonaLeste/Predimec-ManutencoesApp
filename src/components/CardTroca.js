import { useEffect, useState } from 'react';
import {View, Image, StyleSheet, Text, Alert, TouchableOpacity} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import Button from './Button';
import Divider from './Divider';
import TextInput from './TextInput';

import { tirarFotoTroca } from '../utils/fotoUtils';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing, larguraTela } from "../constants/Spacing";

const FOTO_BASE64_TESTE = "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const CardTroca = ({trocaObj, equipTrocas, setEquipTrocas, equipId, setFotoSelecionada, setVerFoto, onChange}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [objOriginal, setObjOriginal] = useState({...trocaObj})
  const [objEditado, setObjEditado] = useState({...trocaObj})
  const [updateFotoFlag, setUpdateFotoFlag] = useState(0)

  const [fotosTemp, setFotosTemp] = useState([])

  const [gruposFotos, setGruposFotos] = useState([])

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev)
  }

  const onNomeChange = (textoInput) => {
    setObjEditado((prev) => ({...prev, nome: textoInput.toLowerCase()}))

    if(textoInput.length > 0){
      let objAtualizado = {...objEditado, nome: textoInput.toLowerCase()}; 
      onChange(objAtualizado)
    }
  }

  const onNomeBlur = (texto) => {
    if(texto.length <= 0 ){
      setObjEditado(objOriginal.nome)
    }
    if(nomeTrocaJaExiste(texto, objEditado.id)){
      let nomeAindaRepete = true;
      let nomeAtual = objEditado.nome

      while(nomeAindaRepete){
        nomeAtual = nomeAtual.slice(0, -1)

        if(!nomeTrocaJaExiste(nomeAtual)){
          nomeAindaRepete = false;
          setObjEditado((prev) => ({...prev, nome: nomeAtual}))

          // para atualizar a lista de trocas do equip precisamos do obj atualizado agora, vamos fazer uma copia na função mesmo
          let objAtualizado = {...objEditado, nome: nomeAtual}; 
          onChange(objAtualizado)
        }
      }
    }
  }

  const nomeTrocaJaExiste = (nome, id) => {
    let trocaJaExiste = false;

    for(const troca of equipTrocas){
      if(troca.id !== id){
        if(troca.nome === nome.toLowerCase()){
          trocaJaExiste = true;
        }
      }
    }

    return trocaJaExiste;
  }
  
  const addNovaFotoTroca = async () => {
    let fotoObj = await tirarFotoTroca();
    
    if(fotoObj){
      /**
       * SALVAR NO STORAGE AQUI PARA OBTER UM CAMINHO DA FOTO
       */

      const novaFotoObj = {
        "nome": fotoObj.nome,
        "caminho": "...",
        "legenda": `Foto antes da troca de '${objEditado.nome}'`,
        "momento": "antes",
        "grupo_id": `Eqp-${equipId}-${objEditado.nome}-${objEditado.nome.substring(6, 21)}`,
        "equip_troca_id": parseInt(objEditado.id)
      }

      let listaFotosDaTroca = objEditado.fotos
      let novaListaFotos = [...listaFotosDaTroca, novaFotoObj]
      
      // atualiza estado para renderização
      setObjEditado({...objEditado, fotos: novaListaFotos})
      
      // atualiza lista de equipamentos sem depender do estado
      setUpdateFotoFlag(prev => prev + 1)
    }
    
  }

  const deletarTroca = () => {
    setEquipTrocas(prev => prev.filter((item) => item.id !== objEditado.id))
  }

  const confirmarDeletar = () => {
    Alert.alert(
      '',
      'Tem certeza que deseja deletar a troca? Todos os dados serão perdidos',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deletarTroca()
          },
        },
      ],
      { cancelable: false }
    );
  }

  const salvarAlteracoes = () => {
    onChange(objEditado)
  }

  const salvarNovasFotos = () => {

  }

  useEffect(() => {
    setObjEditado({...trocaObj})
  }, [trocaObj])

  useEffect(() => {
    // Atualizando os cards das fotos
    let listaFotos = objEditado.fotos
    let listaIDsGrupos = []
    let listaGrupos = []

    if(!listaFotos) return

    listaFotos.forEach((foto) => {
      if(!listaIDsGrupos.includes(foto.grupo_id)){
        listaIDsGrupos.push(foto.grupo_id)
      }
    })

    listaIDsGrupos.forEach((grupo_id) => {
      let arrGrupo = []

      listaFotos.forEach((foto) => {
        if(foto.grupo_id === grupo_id){
          arrGrupo.push(foto)
        }
      })

      listaGrupos.push(arrGrupo)
    })

    setGruposFotos(listaGrupos)
  }, [objEditado])

  useEffect(() => {
    salvarAlteracoes()
  }, [updateFotoFlag])

  return(
    <View style={styles.container}>
      <View style={{flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{flexGrow: 0.90}}>
          <TextInput 
            value={capitalizeFirstLetter(objEditado.nome)}
            onChangeText={onNomeChange}
            onBlur={() => onNomeBlur(objEditado.nome)}
            placeholder="Nome da troca..."
            containerStyle={{maxWidth: 250, maxHeight: 60, marginVertical: spacing.small}}
            style={styles.input}
          />
        </View>

        <View style={{flex: 0}}>
          <TouchableOpacity 
            style={{height: 30, width: 30, alignItems: 'center', justifyContent: 'center'}}
            onPress={toggleExpanded}
          >
            {isExpanded ? (
              <MaterialIcons name="expand-less" size={30} color={colors.black} />
            ) : (
              <MaterialIcons name="expand-more" size={30} color={colors.black} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {isExpanded && (
        <View style={{flex: 0}}>
          <View style={{flex: 'auto', alignItems: 'center', marginVertical: spacing.small}}>
            {gruposFotos.length > 0 && (
              gruposFotos.map((grupoFotos, index) =>
                <ItemFoto 
                  key={index} 
                  grupoFotos={grupoFotos} 
                  setObjEditado={setObjEditado} 
                  objEditado={objEditado}
                  setFotoSelecionada={setFotoSelecionada}
                  setVerFoto={setVerFoto}             
                  setUpdateFotoFlag={setUpdateFotoFlag}
                />
              )
            )}
          </View> 

          <View style={{flex: 0, marginVertical: spacing.small}}>
            <Button title='Nova Foto' onPress={addNovaFotoTroca}/>
            <Button 
              title="Excluir Troca" 
              backgroundColor={colors.red} 
              color={colors.white}
              onPress={confirmarDeletar}  
            />
          </View>
        </View>
      )}
    </View>
  )
}

const ItemFoto = ({grupoFotos, setObjEditado, objEditado, setFotoSelecionada, setVerFoto, setUpdateFotoFlag,}) => {
  const [arrFotos, setArrFotos] = useState([...grupoFotos])
  const [fotoAntes, setFotoAntes] = useState({})
  const [fotoDepois, setFotoDepois] = useState({})

  const [fotosTemp, setFotosTemp] = useState([])

  const onChangeLegendaAntes = (texto) => {
    setFotoAntes(prev => ({...prev, legenda: texto}))

    setObjEditado(prev => {
      let listaFotos = [...prev.fotos]

      for(const foto of listaFotos){
        if(foto.nome === fotoAntes.nome){
          foto.legenda = texto
        }
      }

      return ({...prev, fotos: listaFotos})
    })
  }

  const onChangeLegendaDepois = (texto) => {
    setFotoDepois(prev => ({...prev, legenda: texto}))

    setObjEditado(prev => {
      let listaFotos = [...prev.fotos]

      for(const foto of listaFotos){
        if(foto.nome === fotoDepois.nome){
          foto.legenda = texto
        }
      }

      return ({...prev, fotos: listaFotos})
    })
  }

  const abrirFotoModal = () => {
    setFotoSelecionada(FOTO_BASE64_TESTE)
    setVerFoto(true)
  }

  const deletarFotos = (grupoId) => {
    let novaLista = objEditado.fotos.filter((foto) => foto.grupo_id !== grupoId)
    setObjEditado(prev => ({...prev, fotos: novaLista}))
    setUpdateFotoFlag(prev => prev + 1)
  }

  const confirmarDeletar = (grupoId) => {
    Alert.alert(
      '',
      'Tem certeza que deseja deletar as fotos? Não será possível recuperá-las.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deletarFotos(grupoId)
          },
        },
      ],
      { cancelable: false }
    );
  }

  const tirarFotoDepois = async () => {
    let fotoObj = await tirarFotoTroca()

    if(fotoObj){
      /**
       * SALVAR NO STORAGE AQUI PARA OBTER UM CAMINHO DA FOTO
       */

      const novaFotoObj = {
        "nome": fotoObj.nome,
        "caminho": "...",
        "legenda": `Foto depois da troca '${objEditado.nome}'`,
        "momento": "depois",
        "grupo_id": fotoAntes.grupo_id,
        "equip_troca_id": parseInt(objEditado.id)
      }

      let listaFotosDaTroca = objEditado.fotos
      let novaListaFotos = [...listaFotosDaTroca, novaFotoObj]

      setObjEditado({...objEditado, fotos: novaListaFotos})
      setUpdateFotoFlag(prev => prev + 1)
    }
  }

  useEffect(() => {
    setArrFotos({...grupoFotos})
    let fotoAntes = grupoFotos.find((item) => item.momento === 'antes')
    let fotoDepois = grupoFotos.find((item) => item.momento === 'depois')

    let fotoTemplate = {
      "nome": "",
      "caminho": "",
      "legenda": "",
      "momento": "",
      "grupo_id": ""
    }

    if(fotoAntes){
      setFotoAntes(fotoAntes)
    } else {
      setFotoAntes({...fotoTemplate})
    }

    if(fotoDepois){
      setFotoDepois(fotoDepois)
    } else {
      setFotoDepois({...fotoTemplate})
    }
  }, [grupoFotos])

  return(
    <View style={styles.itemContainer}>
      <View style={styles.itemFoto}>
        <View style={{flex: 'auto', alignItems: 'center'}}>
          <Text style={styles.textoPequenoTitulo}>Antes</Text>
          <TouchableOpacity style={{width: 50, height: 50}} onPress={abrirFotoModal}>
            <Image 
              source={require('../../assets/images/exemplo-troca.png')} 
              style={{
                borderRadius: 4,
                width: 50,
                height: 50
              }}/>
          </TouchableOpacity>
        </View>

        <View style={{flex: 0.9, alignItems: 'center'}}>
          {fotoAntes.caminho !== undefined ? (
            <Text style={[styles.textoPequeno, {color: colors.greeen}]}>Foto Selecionada</Text>
          ) : (
            <Text style={styles.textoPequeno}>Nenhuma foto selecionada</Text>
          )}
          <TextInput 
            placeholder="Legenda"
            value={fotoAntes.legenda}
            onChangeText={onChangeLegendaAntes}
            containerStyle={{width: '100%',maxHeight: 60, marginVertical: spacing.small}}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.itemFoto}>
        <View style={{flex: 'auto', alignItems: 'center'}}>
          <Text style={styles.textoPequenoTitulo}>Depois</Text>
          {fotoDepois?.caminho !== "" && (
            <TouchableOpacity style={{width: 40, height: 40, marginBottom: spacing.small}} onPress={abrirFotoModal}>
              <Image 
                source={require('../../assets/images/exemplo-troca.png')} 
                style={{
                  borderRadius: 4,
                  width: 40,
                  height: 40
                }}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.botaoFoto} onPress={tirarFotoDepois}>
            <FontAwesome name="camera" size={24} color="black" style={{zIndex: 2}}/>
          </TouchableOpacity>
        </View>
        
        <View style={{flex: 0.9, alignItems: 'center'}}>
          {fotoDepois.caminho !== "" ? (
            <Text style={[styles.textoPequeno, {color: colors.greeen}]}>Foto Selecionada</Text>
          ) : (
            <Text style={styles.textoPequeno}>Nenhuma foto selecionada</Text>
          )}

          {fotoDepois?.nome !== "" && fotoDepois?.nome !== undefined && (
            <TextInput 
              placeholder="Legenda"
              value={fotoDepois.legenda}
              onChangeText={onChangeLegendaDepois}
              containerStyle={{width: '100%', maxHeight: 60, marginVertical: spacing.small}}
              style={styles.input}
            />
          )}
        </View>
      </View>

      <View style={[styles.itemFoto, {justifyContent: 'flex-end', marginTop: spacing.small}]}>
        <TouchableOpacity style={{width: 30}} onPress={() => confirmarDeletar(fotoAntes.grupo_id)}>
          <Ionicons name="trash-sharp" size={30} color={colors.red} />
        </TouchableOpacity>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    minWidth: larguraTela.largura * 0.90,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: spacing.medium,
  },
  input: {
    fontFamily: 'Inter-Medium', 
    fontSize: fontSizes.medium, 
    height: 'auto', 
    marginVertical: spacing.small
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSizes.medium,
    alignSelf: 'center',
    width: '100%'
  },
  botaoFoto:{
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoPequeno: {
    width: '100%',
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'Inter-SemiBold'
  },
  textoPequenoTitulo: {
    fontFamily: 'Inter-SemiBold',
    width: '100%',
    fontSize: 12,
    textAlign: 'center'
  },
  itemContainer: {
    width: '95%',
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: spacing.medium,
    alignItems: 'center'
  },
  itemFoto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  }
})

export default CardTroca