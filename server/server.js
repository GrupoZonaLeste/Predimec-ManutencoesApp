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
    user = await db.addInfosDatabase(req.body.nome, req.body.login, req.body.senha)
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