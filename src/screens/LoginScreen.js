import {View, Text, StyleSheet, Image, StatusBar, Alert} from 'react-native'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo/logo-completa.png'
import Button from '../components/Button'
import TextInput from '../components/TextInput';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

import urlapi from '../utils/devconfig'

const LoginScreen = () => {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')

  const navigation = useNavigation();
  
  const goToHomepage = async () => {
    if(login == '' || senha == ''){
      Alert.alert("ERRO", "Preencha todos os campos")
      return
    }
    await fetch(`${urlapi.urlapi}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'        
      },
      body: JSON.stringify({
        login: login,
        senha: senha
      })
    })
    .then(res => res.json())
    .then(res => {
      if( res.tipo == "admin") {
        Alert.alert("Sucesso", "Logado como admin!")
        navigation.navigate('HomeTabs', {screen: 'Home'})
      } 
      if( res.tipo == "membro" ) {
        Alert.alert("Sucesso", "Logado como membro!")
        navigation.navigate('HomeTabs', {screen: 'Home'})
      }
      if( res.mensagem == "usuario não encontrado"){
        Alert.alert("Erro", "Usuário não encontrado!")
      }
    })
    
    
  }
  
  return(
    <View style={styles.mainContainer}>
      <View style={{flex: 0.4, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Image style={styles.logo} source={require('../../assets/logo/logo-completa.png')}/>
      </View>

      <View style={{flexGrow: 1, width: '100%', alignItems: 'center', padding: spacing.medium}}> 
        <Text style={styles.bemVindo}>Bem Vindo!</Text>
        <Text style={styles.texto}>Faça login para acessar o sistema</Text>

        <View style={[styles.loginContainer, styles.elevation]}>
          <Text style={[styles.texto, styles.inputMargin]}>Login</Text>
          <TextInput placeholder="Digite o login" style={styles.inputMargin} onChangeText={text => setLogin(text)}/>

          <Text style={[styles.texto, styles.inputMargin]}>Senha</Text>
          <TextInput placeholder="Digite a senha" style={styles.inputMargin} password={true} onChangeText={text => setSenha(text)}/>

          <Button title="Fazer Login" containerStyle={styles.buttonStyle} onPress={async () => await goToHomepage()}/>
        </View>
      </View>
      
      <View style={{flex: 0.2, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.texto}>{"Developed by </nomeDoGrupo>"}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.white
  },
  logo: {
    width: '188.33',
    height: '49.66',
    resizeMode: 'stretch'
  },
  bemVindo: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 45
  },
  loginContainer: {
    width: "90%",
    backgroundColor: colors.white,
    margin: spacing.xlarge,
    borderWidth: 1,
    borderColor: colors.gray,
    padding: spacing.large,
    borderRadius: 8,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
  texto: {
    fontSize: fontSizes.small
  },
  inputMargin: {
    marginVertical: spacing.small
  },
  buttonStyle: {
    marginTop: spacing.large
  }
})

export default LoginScreen
