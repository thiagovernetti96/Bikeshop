import { Repository } from "typeorm";
import{Bike } from "../model/bike";

export class BikeService {
  private bikeRepository: Repository<Bike>;
  repository: any;
  constructor(bikeRepository: Repository<Bike>) {
    this.bikeRepository = bikeRepository;
  }

  async inserir(bike:Bike): Promise<Bike> {
    if(!bike.modelo || !bike.valor || !bike.marca) {
      throw ({id:400,msg:"Modelo, valor e marca são obrigatórios"});
    }
    return await this.bikeRepository.save(bike);
  }

  async listar(): Promise<Bike[]> {
    return await this.bikeRepository.find();
  }

  async buscarporId(id: number): Promise<Bike | undefined> {
    let bike = await this.bikeRepository.findOne({ where: { id } });
    if (!bike) {
      throw ({id:404,msg:"Bike não encontrada"});
    }
    return bike;
  }

  async atualizar(id: number, bike: Bike): Promise<Bike | undefined> {
    let bikeExistente = await this.bikeRepository.findOne({ where: { id } });
    console.log(bikeExistente);
    if (!bikeExistente) {
      throw ({id:404,msg:"Bike não encontrada"});
    }
      else {
      bikeExistente.modelo = bikeExistente.modelo;
      bikeExistente.valor = bikeExistente.valor;
      bikeExistente.marca = bikeExistente.marca;
      return await this.repository.save(bikeExistente);
    }
    
  }

  async deletar(id: number): Promise<void> {
    let bike = await this.bikeRepository.findOne({ where: { id } });
    if (!bike) {
      throw({id:404,msg:"Bike não encontrada"});
    }
    await this.bikeRepository.remove(bike);
  }

}