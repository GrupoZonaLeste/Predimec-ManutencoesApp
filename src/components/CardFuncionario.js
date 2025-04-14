import {View, Text, StyleSheet, Alert} from 'react-native'
import Button from './Button';
import database from '../mock/database.json'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const CardFuncionario = ({id, data, nome, login, senha, toggleModal, setUpdateFlag}) => {
  const deletarMembro = () => {
    // CHAMAR A API PASSANDO ALGUM PARAMETRO PRA APAGAR O MEMBRO

    let listaAtualizada = database.Membros.filter(item => item.id != id)
    database.Membros = listaAtualizada
    Alert.alert("", "O membro foi deletado com sucesso")
    setUpdateFlag(prev => prev + 1)
  }

  const confirmarDeletar = () => {
    Alert.alert(
      '',
      'Tem certeza que deseja deletar esse membro? ',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deletarMembro()
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
        <Button containerStyle={{flex: 0.48}} title="Editar" onPress={toggleModal}/>
        <Button containerStyle={{flex: 0.48}} backgroundColor={colors.red} color={colors.white} title="Excluir" onPress={confirmarDeletar}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 3,
    elevation: 1,
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