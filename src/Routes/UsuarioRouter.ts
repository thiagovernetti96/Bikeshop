import { UsuarioController } from './../Controller/UsuarioController';
import {Router} from 'express';

export const usuarioRouter = (controller: UsuarioController) : Router => {
    const router = Router();
    router.get('/', (req, res) => controller.listar(req, res));
    router.post('/', (req, res) => controller.inserir(req, res));
    return router;
}