const WRfiles = require('node:fs/promises')
const manipulateINI = require('ini')

async function addInfosDatabase(nome, email, senha) {   
    user = await getUsuario(email)
    if(user){
        return false
    }
    let texto = await WRfiles.readFile('./database.ini', {
        encoding: 'utf-8'
    })
    let config = {
        database: {
            nome: nome,
            email: email,
            senha: senha
        }
    }
    texto = manipulateINI.stringify(config, {
        section: 'section'
    })
    
    await WRfiles.writeFile('./database.ini', texto)
    return true
}

async function getUsuario(login, senha=''){
    let texto = await WRfiles.readFile('./database.ini', {
        encoding: 'utf-8'
    })

    let infos = manipulateINI.parse(texto)
    if(senha != ''){
        if (login == infos.section.database.login && senha == infos.section.database.senha) {
            return true
        } else {
            return false
        }
    } else {
        if(login == infos.section.database.login){
            return true
        } else {
            return false
        }
    }
}

async function getUsuarioData(login){
    let texto = await WRfiles.readFile('./database.ini', {
        encoding: 'utf-8'
    })
    
    let infos = manipulateINI.parse(texto)
    if (login == infos.section.database.login){
        return {
            "nome": infos.section.database.nome,
            "login": infos.section.database.login,
            "senha": infos.section.database.senha
        }
    }

}
module.exports = {
    addInfosDatabase,
    getUsuario,
    getUsuarioData
}