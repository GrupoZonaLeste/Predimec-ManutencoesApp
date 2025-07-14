import React, {createContext, useEffect, useState} from 'react'
import { Alert } from 'react-native'
import database from '../mock/database.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LOGIN_ROUTES } from '../api/endpoints';

export const AuthContext = createContext({
  usuario: null,
  login: () => {},
  logout: () => {}
})

export const AuthProvider =  ({children}) => {
  const [usuario, setUsuario] = useState(null)
  
  const login = async (login, senha) => {
    try {
      const resposta_api = await fetch(LOGIN_ROUTES.POST_LOGIN, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: login,
          senha: senha
        }),
      });

      if(resposta_api.ok){
        const dados = await resposta_api.json()
        if(dados){

          const dadosUsuario = {
            "id": dados.funcionario.id, 
            "nome": dados.funcionario.nome,
            "tipo": dados.funcionario.tipo,
            "token": dados.token,
			      "vencimento": dados.dataVencimento
          }

          setUsuario(dadosUsuario)
          await AsyncStorage.setItem('@usuario', JSON.stringify(dadosUsuario))
        } else {
          Alert.alert("Erro","Login ou senha inválidos")
          throw new Error('Login ou senha inválidos');
        }
      } else {
        Alert.alert("Erro","Login ou senha inválidos")
      }
    } catch(erro){
      console.error('Erro ao fazer login:', erro);
    }
  }

  const logout = async () => {
    try{
      const resposta_api = await fetch(LOGIN_ROUTES.POST_LOGOUT, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: usuario.token
        }),
      })

      console.warn(resposta_api.ok)
      
      if(!resposta_api.ok){
        console.error("Erro ao deslogar")
      }

      setUsuario(null)
      await AsyncStorage.removeItem('@usuario');
    } catch(erro){
      console.error('Erro ao deslogar:', erro);
    }
  }

  const validarToken = async () => {
    const dataAtual = new Date().toISOString()

    if(dataAtual > usuario.vencimento){
      logout()
    }
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