import {Request, Response} from 'express';
import { ClienteService } from '../service/ClienteService';

export class ClienteController {
  private clienteService: ClienteService;

  constructor(clienteService: ClienteService) {
    this.clienteService = clienteService;
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const cliente = req.body;
      const novoCliente = await this.clienteService.inserir(cliente);
      res.status(201).json(novoCliente);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    const clientes = await this.clienteService.listar();
    res.status(200).json(clientes);   
  }

  async buscarporId(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const cliente = await this.clienteService.buscarporId(id);
      res.status(200).json(cliente);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const {nome, email} = req.body;
      const clienteAtualizado = await this.clienteService.atualizar(id,{ nome, email});
      res.status(200).json(clienteAtualizado);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.clienteService.deletar(id);
      res.status(204).send();
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async buscarPorNome(req: Request, res: Response): Promise<void> {
    try {
      const nome = req.params.nome;
      const cliente = await this.clienteService.buscarPorNome(nome);
      res.status(200).json(cliente);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async buscarPorEmail(req: Request, res: Response): Promise<void> {
    try {
      const email = req.params.email;
      const cliente = await this.clienteService.buscarPorEmail(email);
      res.status(200).json(cliente);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

}