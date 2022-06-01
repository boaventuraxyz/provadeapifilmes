import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import usercontrol from './controller/usuariocontroller.js'
import filmecontrol from './controller/filmecontroller.js'

const server = express();
server.use(cors());
server.use(express.json());

server.use('/storage/capaFilmes', express.static('storage/capaFilmes'))

server.use(usercontrol);
server.use(filmecontrol);

server.listen(process.env.PORT, () => console.log(`API NA PORTA ${process.env.PORT}`));