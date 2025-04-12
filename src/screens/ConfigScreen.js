import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import CardConfiguracao from '../components/CardConfiguracao';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { AuthContext } from '../contexts/AuthContext';
import Logomarca from '../components/Logomarca';
import { shadow } from '../constants/Effects'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";
import { useContext } from 'react';

const ConfigScreen = () => {
  const { logout } = useContext(AuthContext)

  return(
    <View style={styles.mainContainer}>
      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Logomarca />
      </View>

      <View style={{flex: 'auto', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={styles.tituloConfig}>Configurações</Text>
      </View>

      <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
        <ScrollView style={[{flex: 1}, shadow, styles.configContainer]} persistentScrollbar={true}>
          <CardConfiguracao nome="Editar Foto de Perfil">
            <MaterialIcons name="photo" size={30} color="black" />
          </CardConfiguracao>

          <CardConfiguracao nome="Modelos de Relatório">
            <AntDesign name="filetext1" size={30} color="black" />
          </CardConfiguracao>

          <CardConfiguracao nome="Modo de Exibição">
            <MaterialIcons name="display-settings" size={30} color="black" />
          </CardConfiguracao>
        </ScrollView>
      </View>

      <View style={[{flex: 'auto'}, shadow, styles.configContainer]}>
        <CardConfiguracao nome="Sair" textStyle={{color: colors.red}} onPress={logout}>
          <SimpleLineIcons name="logout" size={24} color={colors.red} />
        </CardConfiguracao>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'green',
    padding: spacing.xlarge,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.white
  },
  tituloConfig: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSizes.xlarge,
  },
  configContainer: {
    width: "100%",
    backgroundColor: colors.white,
    margin: spacing.medium,
    borderWidth: 1,
    paddingHorizontal: spacing.large,
    borderColor: colors.gray,
    borderRadius: 8,
  }
})

export default ConfigScreen