import {inserirFilme} from '../repository/filmerepository.js'

import { Router } from 'express'

const server = Router();

server.post('/filme', async (req, resp) => {
        try{
            const novoFilme = req.body;
            const filme =  await inserirFilme(novoFilme);

            if(!filme){
                throw new Error('Informações inválidas, tente novamente')
            }

            resp.send(filme)
        } 
        catch(err){
            resp.send(400).send({
                erro: 'Ocorreu um erro: ' + err.message
            })

        }
})



export default server;

