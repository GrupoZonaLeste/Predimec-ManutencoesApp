import {View, Text, StyleSheet, StatusBar, Alert} from 'react-native'
  import { SafeAreaView } from 'react-native-safe-area-context';
import Logomarca from '../components/Logomarca';
import Button from '../components/Button'
import TextInput from '../components/TextInput';
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';

const LoginScreen = () => {
  const { login } = useContext(AuthContext)

  const [loginUser, setLoginUser] = useState('')
  const [senhaUser, setSenhaUser] = useState('')

  const handleLogin = async () => {
    try{
      if(!loginUser || !senhaUser){
        Alert.alert('Erro', 'Preencha todos os campos');
        return;
      }

      login(loginUser, senhaUser)
    }catch(e){
      Alert.alert("Erro de Login", "Login ou senha invalidos")
    }
  }

  useEffect(() => {
    Alert.alert("Info para Login",
                  "ADMIN\nLogin: admin@admin.com\nSenha: admin\n\n"+
                  "FUNCIONARIO\nLogin: abc@abc.com\nSenha: 12341234")
    
  }, [])
  
  
  return(
    <SafeAreaView style={styles.mainContainer}>
      <View style={{flex: 0.4, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Logomarca />
      </View>

      <View style={{flexGrow: 1, width: '100%', alignItems: 'center', padding: spacing.medium}}> 
        <Text style={styles.bemVindo}>Bem Vindo!</Text>
        <Text style={styles.texto}>Faça login para acessar o sistema</Text>

        <View style={[styles.loginContainer, styles.elevation]}>
          <Text style={[styles.texto, styles.inputMargin]}>Login</Text>
          <TextInput 
            placeholder="Digite o login" 
            style={styles.inputMargin}
            onChangeText={setLoginUser}
          />

          <Text style={[styles.texto, styles.inputMargin]}>Senha</Text>
          <TextInput 
            placeholder="Digite a senha" style={styles.inputMargin} 
            password={true}
            onChangeText={setSenhaUser}
          />

          <Button title="Fazer Login" containerStyle={styles.buttonStyle} onPress={handleLogin}/>
        </View>
      </View>
      
      <View style={{flex: 0.2, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.texto}>{"Developed by </nomeDoGrupo>"}</Text>
      </View>
    </SafeAreaView>
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
