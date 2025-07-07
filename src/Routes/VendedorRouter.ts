import { VendedorController } from './../Controller/VendedorController';
import {Router} from 'express';

export const vendedorRouter = (controller: VendedorController) : Router => {
    const router = Router();
    router.get('/', (req, res) => controller.listar(req, res));
    router.get('/:id', (req, res) => controller.buscarporId(req, res));
    router.post('/', (req, res) => controller.inserir(req, res));
    router.put('/:id', (req, res) => controller.atualizar(req, res));
    router.delete('/:id', (req, res) => controller.deletar(req, res));
    router.get('/nome/:nome', (req, res) => controller.buscarPorNome(req, res));
    router.get('/email/:email', (req, res) => controller.buscarPorEmail(req, res));
    return router;
}