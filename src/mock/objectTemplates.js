export const getMembroTemplate = () => {
  return(
    {
      "id": 0,
      "data": "",
      "tipo": "",
      "nome": "",
      "login": "",
      "senha": ""
    }
  )
}

export const getClienteTemplate = () => {
  return(
    {
      "id": 0,
      "nome": "",
      "criacao": "",
      "manutencoes": []
    }
  )
}

export const getManutencaoTemplate = () => {
  return(
    {
      "id": 0,
      "data": "",
      "funcionario": "",
      "equipamentos": []
    }
  )
}

export const getEquipamentoTemplate = () => {
  return(
    {
      "id": 0,
      "data": "",
      "nome": "",
      "descricao": "",
      "trocas": "",
      "fotos": []
    }
  )
}

export const getFotoTemplate = () => {
  return(
    {
      "id": 0,
      "nome": "",
      "foto": ""
    }
  )
}