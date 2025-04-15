import React, {useEffect, useState, useRef} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  Modal as ModalReact, 
  FlatList, 
  Image, 
  Dimensions, 
  ScrollView, 
  TouchableOpacity,
  PermissionsAndroid,
  Platform
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import Modal from '../components/Modal'
import Button from '../components/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const VerFotoModal = ({modalVisible, setModalVisible, fotoObj}) => {
  const [listaFotos, setListaFotos] = useState([])
  const windowWidth = Dimensions.get('window').width;
  const [scrollEnabled, setScrollEnabled] = useState(true);

  // estados para saber o id da foto atual e a string base64 para donwload
  const [fotoAtualId, setFotoAtualId] = useState(0)
  const [fotoAtualBase64, setFotoAtualBase64] = useState(fotoObj.fotoAntes)

  
  const saveImage = async () => {
    try{
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if(status !== 'granted'){
        Alert.alert("Permissão negada", "O app precisa de acesso à galeria para salvar imagens.");
        return;
      }

      // criar caminho de armazenamento
      const filename = `imagem_${Date.now().toLocaleString()}.jpg`
      const fileUri = `${FileSystem.cacheDirectory}/${filename}`
    
      // escrever o arquivo
      await FileSystem.writeAsStringAsync(fileUri, fotoAtualBase64, {encoding: FileSystem.EncodingType.Base64});
      
      const asset = await MediaLibrary.createAssetAsync(fileUri);

      Alert.alert('', 'Imagem salva com sucesso. Veja sua galeria')
      setBaixarImagemModal(false)
    }catch(e){

    }
  }
  

  const handleItemChange = ({viewableItems, changed}) => {
    setFotoAtualId(changed[0].key)
    setFotoAtualBase64(changed[0].item.foto)
  }

  // estado do modal de baixar imagem
  const [baixarImageModal, setBaixarImagemModal] = useState(false)

  useEffect(() => {
    let fotoAntes = {
      "foto": fotoObj.fotoAntes,
      "legenda": fotoObj.legendaAntes
    }

    let fotoDepois = {
      "foto": fotoObj.fotoDepois,
      "legenda": fotoObj.legendaDepois,
    }

    setListaFotos([fotoAntes, fotoDepois])    
  }, [fotoObj])

  return(
    <ModalReact
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <Modal
        modalVisible={baixarImageModal}
        setModalVisible={setBaixarImagemModal}
        title="Download"
      >
        <Button 
          containerStyle={styles.baixarImagemButton} 
          title='Baixar Imagem'
          onPress={saveImage}
        />
      </Modal>

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[{flex: 'auto'}, styles.modalHeader]}>
            <AntDesign name="close" size={40} color={colors.white} onPress={() => setModalVisible(!modalVisible)}/>
            {fotoAtualId == 0 ? (
              <Text style={styles.textoLegenda}>Antes</Text>
            ) : (
              <Text style={styles.textoLegenda}>Depois</Text>
            )}
            <Text style={styles.tituloLegenda}>{parseInt(fotoAtualId) + 1} / 2</Text>
          </View>
          
          <FlatList 
            data={listaFotos}
            horizontal={true}
            pagingEnabled={true}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 100
            }}
            scrollEnabled={scrollEnabled}
            onViewableItemsChanged={(viewableItems, changed) => handleItemChange(viewableItems, changed)}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({item}) => (
              <>
                <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
                  <TouchableOpacity 
                    onLongPress={() => Platform.OS === 'android' ? setBaixarImagemModal(true) : null}
                  >
                    <Image
                      source={{ uri : `data:image/jpeg;base64,${item.foto}`}}
                      style={{
                        flex: 'auto',
                        width: windowWidth, 
                        height: windowWidth,
                      }} 
                      resizeMode='contain'
                      onInteractionStart={() => setScrollEnabled(false)}
                      onInteractionEnd={() => setScrollEnabled(true)}
                    />
                  </TouchableOpacity>
                  <Text style={styles.tituloLegenda}>
                    Legenda: 
                  </Text>
                  <ScrollView 
                    style={{flexGrow: 1}}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start', paddingVertical: spacing.small}}
                  >
                    <Text selectable style={[styles.textoLegenda, {width: windowWidth * 0.90}]}>{item.legenda}</Text>
                  </ScrollView>
                </View>
              </>
            )}
          />

        </View>
      </View>
    </ModalReact>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    alignSelf: 'center',
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '90%',
    borderRadius: 20,
    paddingVertical: spacing.large,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row-reverse', 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: spacing.medium,
    paddingHorizontal: spacing.xlarge,
  },
  modalTitulo: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.large,
  },
  dicaAmplicarImg: {
    flex: 'auto',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.white, 
    marginVertical: spacing.medium,
  },
  tituloLegenda: {
    flex: 'auto',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSizes.medium,
    color: colors.white,
    marginVertical: spacing.medium,
  },
  textoLegenda: {
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: fontSizes.small,
    color: colors.white
  },
  baixarImagemButton: {
    alignSelf: 'stretch',
    marginVertical: spacing.medium
  }
})

export default VerFotoModal