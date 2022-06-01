import {alterarImagem, inserirFilme} from '../repository/filmerepository.js'
import multer from 'multer'
import { Router } from 'express'

const server = Router();
const upload = multer({dest: 'storage/capaFilmes'})

server.post('/filme', async (req, resp) => {
        try{
            const novoFilme = req.body;

            if(!novoFilme.nome){
                throw new Error('Nome do filme é obrigatório!');
            }

            if(!novoFilme.sinopse){
                throw new Error('Sinopse do filme é obrigatória!');
            }

            if(novoFilme.avaliacao == undefined || novoFilme.avaliacao < 0){
                throw new Error('Avaliação do filme é obrigatória!');
            }

            if(!novoFilme.lancamento){
                throw new Error('Data de Lançamento do filme é obrigatória!');
            }

            if(!novoFilme.disponivel){
                throw new Error('Campo disponível é obrigatório!');
            }

            if(!novoFilme.usuario){
                throw new Error('Usuário não logado!');
            }

            const filme =  await inserirFilme(novoFilme);
            resp.send(filme)
        } 
        catch(err){
            resp.send({
                erro:err.message
            })

        }
})

server.put('/filme/:id/capa',upload.single('capa'), async (req, resp) => {

    try{
        const {id} = req.params;
        const imagem = req.file.path
        const resposta = await alterarImagem(imagem, id);

        if(resposta != 1){
            throw new Error('A Imagem não pode ser salva.')
        }

        resp.status(204).send()


    }
    catch(err){
        resp.send({
            erro:err.message
        })
    }
})



export default server;

