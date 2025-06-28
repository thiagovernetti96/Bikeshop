import express, { Request, Response } from 'express';
import { Bike } from './model/bike';
import { BikeRepository } from './repository/BikeRepository';
import { BikeService } from './service/BikeService';
import { BikeController } from './Controller/BikeController';
import {bikeRouter} from './Routes/BikeRouter';
import { Usuario } from './model/usuario';
import { UsuarioRepository } from './repository/UsuarioRepository';
import { UsuarioService } from './service/UsuarioService';
import { UsuarioController } from './Controller/UsuarioController';
import { usuarioRouter } from './Routes/UsuarioRouter';
import { Cliente } from './model/cliente';
import { ClienteRepository } from './repository/ClienteRepository';
import { ClienteService } from './service/ClienteService';
import { ClienteController } from './Controller/ClienteController';
import { clienteRouter } from './Routes/ClienteRouter';
import { Vendedor } from './model/vendedor';
import { VendedorRepository } from './repository/VendedorRepository';
import { VendedorService } from './service/VendedorService';
import { VendedorController } from './Controller/VendedorController';
import { vendedorRouter } from './Routes/VendedorRouter';
import { Nota } from './model/nota';
import { NotaRepository } from './repository/NotaRepository';
import { NotaService } from './service/NotaService';
import { NotaController } from './Controller/NotaController';
import { notaRouter } from './Routes/NotaRouter';
import { LoginService } from './service/LoginService';
import { LoginController } from './Controller/LoginController';
import { TokenMiddleware } from './Middleware/TokenMiddleware';

import "reflect-metadata";
import { AppDataSource } from './data-source';




AppDataSource.initialize().then(() => {
const app = express();
const port = 3000;
app.use(express.json());
//Inicializar Dependencias
// Bike
const bikeRepository = AppDataSource.getRepository(Bike);
const bikeService = new BikeService(bikeRepository);
const bikeController = new BikeController(bikeService);
// Usuario
const usuarioRepository = AppDataSource.getRepository(Usuario);
const usuarioService = new UsuarioService(usuarioRepository);
const usuarioController = new UsuarioController(usuarioService);
// Cliente
const clienteRepository = AppDataSource.getRepository(Cliente);
const clienteService = new ClienteService(clienteRepository);
const clienteController = new ClienteController(clienteService);
// Vendedor
const vendedorRepository = AppDataSource.getRepository(Vendedor);
const vendedorService = new VendedorService(vendedorRepository);
const vendedorController = new VendedorController(vendedorService);
// Nota
const notaRepository = AppDataSource.getRepository(Nota);
const bikeRepositoryForNota = AppDataSource.getRepository(Bike);
const clienteRepositoryForNota = AppDataSource.getRepository(Cliente);
const vendedorRepositoryForNota = AppDataSource.getRepository(Vendedor);
const notaService = new NotaService(notaRepository, bikeRepositoryForNota, clienteRepositoryForNota, vendedorRepositoryForNota);
const notaController = new NotaController(notaService);
//Login 
const loginService = new LoginService(usuarioRepository);
const loginController = new LoginController(loginService);
//Midleware TokenMiddleware
const tokenMiddleware = new TokenMiddleware(loginService)
//Rotas
app.get('/teste', (req, res) => {
  res.send('Rota de teste funcionando');
});
app.use('/api/usuario', usuarioRouter(usuarioController));
app.post('/api/login', (req, res) => loginController.realizarLogin(req, res));
app.use(tokenMiddleware.verificarAcesso.bind(tokenMiddleware));
app.use('/api/bike', bikeRouter(bikeController));
app.use('/api/cliente', clienteRouter(clienteController));
app.use('/api/vendedor', vendedorRouter(vendedorController));
app.use('/api/nota', notaRouter(notaController));
app.listen(port, () => {
 console.log(`Servidor rodando em http://localhost:${port}`);
})});