const WRfiles = require('node:fs/promises')
const manipulateINI = require('ini')
const { Console } = require('node:console')

async function addInfosDatabase(nome, email, senha) {
    let user = await getUsuario(email)
    console.log(user)
    if(user){
        return false
    }
    let texto = await WRfiles.readFile('./database.ini', {
        encoding: 'utf-8'
    })

    let config = manipulateINI.parse(texto)
    config[`membro_${Math.round(Math.random() * (1, 100000) + 1)}${nome.charAt(0)}`] = {
        nome: nome,
        email: email,
        senha: senha
    }

    texto = manipulateINI.stringify(config)

    await WRfiles.writeFile('./database.ini', texto)
    return true
}

async function getUsuario(login, senha=''){
    let texto = await WRfiles.readFile('./database.ini', {
        encoding: 'utf-8'
    })
    
    let infos = manipulateINI.parse(texto)
    let retorno = false 

    Object.entries(infos).forEach(element => {  
        senha != '' && login == element[1].email && senha == element[1].senha ? retorno = true : retorno = false
        login == element[1].email ? retorno = true : retorno = false
    })
    return retorno
}

async function getUsuarioData(login){
    let texto = await WRfiles.readFile('./database.ini', {
        encoding: 'utf-8'
    })

    let infos = manipulateINI.parse(texto)
    Object.entries(infos).forEach(element => {  
        if (login == element[1].login){
            return {
                "nome": infos.section.database.nome,
                "login": infos.section.database.login,
                "senha": infos.section.database.senha,
            }
        }
    })
}

async function updateUsuario(login, novosdados){
    let texto = await WRfiles.readFile('./database.ini', {
        encoding: 'utf-8'
    })

    let infos = manipulateINI.parse(texto)
    
    let id 
    Object.entries(infos).forEach(element => {  
        if (login == element[1].email){
            id = element[0].split("_")[1]
        }
    })

    console.log(id)
    if(id) {
        let membroid = `membro_${id}` 
        infos[`${membroid}`].nome = novosdados.nome
        infos[`${membroid}`].email = novosdados.login
        infos[`${membroid}`].senha = novosdados.senha

        texto = manipulateINI.stringify(infos)
        await WRfiles.writeFile('./database.ini', texto)
        return "200"
    } else {
        return "404"
    }
}

async function deleteUsuario(login) {
    let texto = await WRfiles.readFile('./database.ini', {
        encoding: 'utf-8'
    })

    let infos = manipulateINI.parse(texto)
    
    let id 
    Object.entries(infos).forEach(element => {  
        if (login == element[1].email){
            id = element[0].split("_")[1]
        }
    })
    if (id) {
        delete infos[`membro_${id}`]
        texto = manipulateINI.stringify(infos)
        await WRfiles.writeFile('./database.ini', texto)
        return "200"
    } else {
        return "404"
    }
}

async function listUsuarios() {
    let texto = await WRfiles.readFile('./database.ini', {
        encoding: 'utf-8'
    })

    let infos = manipulateINI.parse(texto)
    let users = {}
    Object.entries(infos).forEach(element => {  
        users[element[0]] = element[1]
    })
    return users
}

module.exports = {
    addInfosDatabase,
    getUsuario,
    getUsuarioData,
    updateUsuario,
    deleteUsuario,
    listUsuarios
}