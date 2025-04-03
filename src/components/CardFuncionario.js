import {View, Text, StyleSheet, Alert} from 'react-native'
import Button from './Button';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const CardFuncionario = ({nome, login, senha, toggleModal}) => {
  const deletarMembro = () => {
    // CHAMAR A API PASSANDO ALGUM PARAMETRO PRA APAGAR O MEMBRO
    Alert.alert('Sucesso', 'Membro Deletado com Sucesso')
  }

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.nome}>{nome}</Text>
      <Text style={styles.dataCriacao}>Criado em 11/11/0011</Text>

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
        <Button containerStyle={{flex: 0.48}} backgroundColor={colors.red} color={colors.white} title="Excluir" onPress={deletarMembro}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '98%',
    paddingVertical: spacing.large,
    paddingHorizontal: spacing.xlarge,
    marginVertical: spacing.medium,
    overflow: 'hidden',
    flexWrap: 'nowrap',
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