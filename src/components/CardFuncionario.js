import {View, Text, StyleSheet, Alert} from 'react-native'
import Button from './Button';

import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

import { FUNCIONARIO_ROUTES } from '../api/endpoints';

const CardFuncionario = ({id, data, nome, login, senha, tipo, toggleModal, setUpdateFlag}) => {
  // API - Funcionario
  const deletarFuncionarioAPI = async () => {
    try{
      const resposta_api = await fetch(FUNCIONARIO_ROUTES.DELETE_FUNCIONARIO(id), {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(resposta_api.ok){
        Alert.alert("Sucesso", "Funcionário excluido com sucesso!")
      } else {
        Alert.alert("Erro", "Erro ao excluir funcionário")
      }
    } catch(erro){
      Alert.alert("Erro", "Erro ao excluir funcionário")
      console.error('Erro ao deletar funcionário:', erro);
    }
  }

  const confirmarDeletar = () => {
    Alert.alert(
      '',
      'Tem certeza que deseja deletar esse membro? todas as manutenções criadas por ele serão perdidas',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deletarFuncionarioAPI()
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.nome}>{nome}</Text>
      <Text style={styles.dataCriacao}>Criado em {data}</Text>

      <View style={styles.linha}>
        <Text numberOfLines={1} style={[{flex: "auto"},styles.label]}>Login:</Text>
        <Text numberOfLines={1} style={[{flex: 0.95},styles.value]}>{login}</Text>
      </View>

      <View style={styles.linha}>
        <Text numberOfLines={1} style={[{flex: "auto"},styles.label]}>Senha:</Text>
        <Text numberOfLines={1} style={[{flex: 0.95},styles.value]}>{senha}</Text>
      </View>

      <View style={styles.linha}>
        <Button containerStyle={tipo !== 'admin' ? {flex: 0.48} : {flex: 1}} title="Editar" onPress={toggleModal}/>
        {tipo !== 'admin' && (
          <Button containerStyle={{flex: 0.48}} backgroundColor={colors.red} color={colors.white} title="Excluir" onPress={confirmarDeletar}/>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '98%',
    paddingVertical: spacing.large,
    paddingHorizontal: spacing.xlarge,
    marginVertical: spacing.medium,
  },
  linha: {
    flex: "auto", 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginVertical: spacing.small,
  },
  nome: {
    alignSelf: 'stretch',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSizes.large,
    marginVertical: spacing.small / 2
  },
  dataCriacao: {
    alignSelf: 'stretch',
    fontFamily: 'Inter-Regular',
    fontSize: fontSizes.small,
    marginTop: spacing.small / 2,
    marginBottom: spacing.medium / 2
  },
  label: {
    alignSelf: 'stretch',
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSizes.small,
  },
  value: {
    alignSelf: 'stretch',
    fontFamily: 'Inter-Regular',
    fontSize: fontSizes.small,
  }
})

export default CardFuncionario