export const getMembroTemplate = () => {
  return(
    {
      "id": "",
      "nome": "",
      "login": "",
      "senha": ""
    }
  )
}

export const getClienteTemplate = () => {
  return(
    {
      "id": "",
      "nome": "",
      "criacao": "",
      "manutencoes": []
    }
  )
}

export const getManutencaoTemplate = () => {
  return(
    {
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
      "fotoAntes": "",
      "legendaAntes": "",
      "fotoDepois": "",
      "legendaDepois": ""
    }
  )
}