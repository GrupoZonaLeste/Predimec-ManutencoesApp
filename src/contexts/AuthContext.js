import React, {createContext, useEffect, useState} from 'react'
import { Alert } from 'react-native'
import database from '../mock/database.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  usuario: null,
  login: () => {},
  logout: () => {}
})

export const AuthProvider = ({children}) => {
  const [usuario, setUsuario] = useState(null)
  
  const login = async (login, senha) => {
    const membro = database.Membros.find(
      (m) => m.login === login && m.senha === senha
    )
    
    if(membro){
      const dadosUsuario = {
        "id": membro.id, 
        "nome": membro.nome,
        "tipo": membro.tipo,
        "login": membro.login,
        "senha": membro.senha
      }

      setUsuario(dadosUsuario)
      await AsyncStorage.setItem('@usuario', JSON.stringify(dadosUsuario))
    } else {
      Alert.alert("Erro","Login ou senha inválidos")
      throw new Error('Login ou senha inválidos');
    }
    
    
  }

  const logout = async () => {
    setUsuario(null)
    await AsyncStorage.removeItem('@usuario');
  }

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = await AsyncStorage.getItem('@user')
      if(storedUser){
        setUsuario(JSON.parse(storedUser))
      }
    }
    loadUserData()
  }, [])

  return(
    <AuthContext.Provider value={{ usuario, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}