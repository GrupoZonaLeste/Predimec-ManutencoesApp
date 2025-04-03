const db = require('./db')

const express = require('express')
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: "*",  
    methods: "*",  
    allowedHeaders: "*",  
}));

app.post("/cadastro-membro", async (req, res) => {
    let user = await db.addInfosDatabase(req.body.nome, req.body.login, req.body.senha)
    if (Object.keys(req.body).includes("nome") &&
        Object.keys(req.body).includes("login") &&
        Object.keys(req.body).includes("senha") &&
        user
    ){
        res.status(201).send({"mensagem": "usuario cadastrado"})
    } if(!user) {
        res.status(403).send({"mensagem": "email ja cadastrado"})
    }
})

app.put("/update-membro/:login", async (req, res) => {
    let updateUser
    updateUser = await db.updateUsuario(req.params.login, req.body)
    res.send({"status": updateUser == "200" ? "ok" : updateUser})
})

app.delete("/delete-membro/:login", async (req, res) => {
    let deleteUser
    deleteUser = await db.deleteUsuario(req.params.login)
    res.send({"status": deleteUser == "200" ? "ok" : deleteUser})
})

app.get("/listar-membros", async (req, res) => {
    let users = await db.listUsuarios()
    res.send(users)
})

app.post('/login', async (req, res) => {
    if (await db.getUsuario(req.body.login, req.body.senha)){
        res.status(200).send({"mensagem": "usuario logado!"})
    } else {
        res.status(404).send({"mensagem": "usuario não encontrado"})
    }
})

app.listen(5000, () => {
    console.log("Servidor ativo - PORT:5000")
})