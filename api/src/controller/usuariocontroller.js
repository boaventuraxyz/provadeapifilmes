import { Router } from "express";
import { Login } from "../repository/usuariorepository.js";

const server = Router()

server.post('/usuario/login' , async (req,resp) => {
    try{
        const {email, senha} = req.body;

        const resposta = await Login(email,senha)
        if(!resposta){
            throw new Error('Credenciais Inválidas, tente novamente')
        }
        resp.send(resposta)

    }
    catch(err){
        resp.status(401).send({
            erro: 'Ocorreu um erro: ' + err.message
        })
    }
})

export default server;