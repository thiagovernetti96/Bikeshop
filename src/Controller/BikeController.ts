import { Request, Response } from 'express';
import { BikeService } from "../service/BikeService";

export class BikeController {
  private bikeService: BikeService;

  constructor(bikeService: BikeService) {
    this.bikeService = bikeService;
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const bike = req.body;
      const novoBike = await this.bikeService.inserir(bike);
      res.status(201).json(novoBike);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    const bikes = await this.bikeService.listar();
    res.status(200).json(bikes);   
  }

  async buscarporId(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const bike = await this.bikeService.buscarporId(id);
      res.status(200).json(bike);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const {marca, modelo, valor} = req.body;
      const bikeAtualizado = await this.bikeService.atualizar(id,{ marca, modelo,valor});
      res.status(200).json(bikeAtualizado);
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.bikeService.deletar(id);
      res.status(204).send();
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }

}
