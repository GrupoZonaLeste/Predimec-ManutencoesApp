import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import estiloGlobal from '../estilo-global';

export default function Login() {
  return (
    <View style={estiloGlobal.containerFlex}>
      <View style={styles.containerTituloLogin}>
        <Image source={require('../assets/images/predimec-logoCompleta.png')} style={styles.logoLogin} />
        <View>
          <Text style={styles.tituloLogin}>Bem Vindo!</Text>
          <Text style={styles.subTituloLogin}>Faça o Login para entrar no sistema</Text>
        </View>
      </View>
      <View style={styles.containerFormLogin}>
        <View>
          <Text style={styles.labelFormLogin}>Login</Text>
          <TextInput placeholder='Digite o login...' style={styles.inputLogin} placeholderTextColor={'#747474'} />
        </View>
        <View>
          <Text style={styles.labelFormLogin}>Senha</Text>
          <TextInput placeholder='Digite a senha...' style={styles.inputLogin} placeholderTextColor={'#747474'} />
        </View>
        <TouchableOpacity style={styles.btnLogin}><Text style={{color: 'white'}}>Fazer Login</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTituloLogin: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    gap: 50
  },
  tituloLogin: {
    fontSize: 60,
    fontWeight: '900',
    textAlign: 'center'
  },
  subTituloLogin: {
    fontSize: 20,
    textAlign: 'center'
  },
  logoLogin: {
    width: 200,
    height: 50,
    resizeMode: 'stretch'
  },
  inputLogin: {
    height: 40,
    width: 250,
    backgroundColor: '#DEDEDE',
    borderRadius: 10,
    paddingLeft: 15
  },
  containerFormLogin: {
    padding: 30,
    width: 300,
    maxHeight: 'auto',
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    gap: 20
  },
  labelFormLogin: {
    fontSize: 20
  },
  btnLogin: {
    backgroundColor: 'orange',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10
  }
})