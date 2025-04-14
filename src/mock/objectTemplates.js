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
      "conjunto": "",
      "tag": "",
      "trocas": "",
      "fotos": []
    }
  )
}

export const getFotoTemplate = () => {
  return(
    {
      "id": 0,
      "fotoAntes": "",
      "legendaAntes": "",
      "fotoDepois": "",
      "legendaDepois": ""
    }
  )
}