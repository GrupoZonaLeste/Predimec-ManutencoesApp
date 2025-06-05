const BASE_URL = "http://192.168.15.11:3000"

export const FUNCIONARIO_ROUTES = {
  POST_LOGIN: `${BASE_URL}/funcionario/login`,
  GET_ALL_FUNCIONARIOS: `${BASE_URL}/funcionario`,
  GET_ONE_FUNCIONARIO: (id) => `${BASE_URL}/funcionario/${id}`,
  POST_FUNCIONARIO: `${BASE_URL}/funcionario`,
  PUT_FUNCIONARIO: (id) => `${BASE_URL}/funcionario/${id}`,
  DELETE_FUNCIONARIO: (id) => `${BASE_URL}/funcionario/${id}`
}

export const CLIENTE_ROUTES = {
  GET_ALL_CLIENTES: `${BASE_URL}/cliente`,
  GET_ONE_CLIENTE: (id) => `${BASE_URL}/cliente/${id}`,
  POST_CLIENTE: `${BASE_URL}/cliente`,
  PUT_CLIENTE: (id) => `${BASE_URL}/cliente/${id}`,
  DELETE_CLIENTE: (id) => `${BASE_URL}/cliente/${id}`
}

export const MANUTENCAO_ROUTES = {
  GET_ALL_MANUTENCOES: `${BASE_URL}/manutencao`,
  GET_NEW_MANUTENCOES: `${BASE_URL}/manutencao/recentes`,
  GET_ONE_MANUTENCAO: (id) => `${BASE_URL}/manutencao/${id}`,
  POST_MANUTENCAO: `${BASE_URL}/manutencao`,
  DELETE_MANUTENCAO: (id) => `${BASE_URL}/manutencao/${id}`
}

export const EQUIPAMENTO_ROUTES = {
  GET_ALL_EQUIPAMENTOS: `${BASE_URL}/equipamento`,
  GET_ONE_EQUIPAMENTO: (id) => `${BASE_URL}/equipamento/${id}`,
  POST_EQUIPAMENTO: `${BASE_URL}/equipamento`,
  PUT_EQUIPAMENTO: (id) => `${BASE_URL}/equipamento/${id}`,
  DELETE_EQUIPAMENTO: (id) => `${BASE_URL}/equipamento/${id}`
}