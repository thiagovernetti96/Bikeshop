import {Request, Response} from 'express';
import {NotaService}  from '../service/NotaService';

export class NotaController {
  private notaService: NotaService;

  constructor(notaService: NotaService) {
    this.notaService = notaService;
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const nota = req.body;
      const novaNota = await this.notaService.inserir(nota);
      res.status(201).json(novaNota);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    const notas = await this.notaService.listar();
    res.status(200).json(notas);   
  }

  async buscarporId(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const nota = await this.notaService.buscarporId(id);
      res.status(200).json(nota);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const {valor, data} = req.body;
      const notaAtualizada = await this.notaService.atualizar(id,{ valor, data});
      res.status(200).json(notaAtualizada);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.notaService.deletar(id);
      res.status(204).send();
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

}