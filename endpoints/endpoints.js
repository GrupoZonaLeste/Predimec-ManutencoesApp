// Define base URL
const baseURL = 'http://localhost:3000';

const auth_prefix = "/auth"
const client_prefix = "/cliente"
const equipamento_prefix = "/equipamento"
const funcionario_prefix = "/funcionario"
const manutencao_prefix = "/manutencao"
const relatorio_prefix = "/relatorio"

const endpoints = {
    cliente_enpoint(id=null) { return id ? `${baseURL}${client_prefix}/${id}` : `${baseURL}${client_prefix}/` },
    funcionario_enpoint(id=null) { return id ? `${baseURL}${funcionario_prefix}/${id}` : `${baseURL}${funcionario_prefix}/` },
    equipamento_enpoint(id=null) { return id ? `${baseURL}${equipamento_prefix}/${id}` : `${baseURL}${equipamento_prefix}/` },
    manutencao_enpoint(id=null) { return id ? `${baseURL}${manutencao_prefix}/${id}` : `${baseURL}${manutencao_prefix}/` },
    relatorio_enpoint(id=null) { return id ? `${baseURL}${relatorio_prefix}/${id}` : `${baseURL}${relatorio_prefix}/` }
}

export default function get_endpoint(nome) {
    if (nome == "cliente") return endpoints['cliente_enpoint']
    if (nome == "funcionario") return endpoints['funcionario_endpoint']
    if (nome == "equipamento") return endpoints['equipamento_enpoint']
    if (nome == "manutencao") return endpoints['manutencao_enpoint']
    if (nome == "relatorio") return endpoints['relatorio_endpoint']
}