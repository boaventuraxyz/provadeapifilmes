import { Router } from "express";
import { Login } from "../repository/usuariorepository";

const server = Router()

server.post('/usuario/login' , async (req,resp) => {
    try{
        const {email, senha} = req.body;

        const resposta = await Login(email,senha)
        resp.send(resposta)
    }
    catch(err){
        resp.status(400).send({
            erro: 'Ocorreu um erro: ' + err.message
        })
    }
})