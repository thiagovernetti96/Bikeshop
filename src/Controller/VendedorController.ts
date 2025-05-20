import {Request, Response} from 'express';
import {VendedorService} from '../service/VendedorService';

export class VendedorController {
  private vendedorService: VendedorService;

  constructor(vendedorService: VendedorService) {
    this.vendedorService = vendedorService;
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const vendedor = req.body;
      const novoVendedor = await this.vendedorService.inserir(vendedor);
      res.status(201).json(novoVendedor);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }


  async listar(req: Request, res: Response): Promise<void> {
    const vendedores = await this.vendedorService.listar();
    res.status(200).json(vendedores);   
  }

  async buscarporId(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const vendedor = await this.vendedorService.buscarporId(id);
      res.status(200).json(vendedor);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const {nome, email} = req.body;
      const vendedorAtualizado = await this.vendedorService.atualizar(id,{ nome, email});
      res.status(200).json(vendedorAtualizado);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.vendedorService.deletar(id);
      res.status(204).send();
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async buscarPorNome(req: Request, res: Response): Promise<void> {
    try {
      const nome = req.params.nome;
      const vendedor = await this.vendedorService.buscarPorNome(nome);
      res.status(200).json(vendedor);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async buscarPorEmail(req: Request, res: Response): Promise<void> {
    try {
      const email = req.params.email;
      const vendedor = await this.vendedorService.buscarPorEmail(email);
      res.status(200).json(vendedor);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }
}