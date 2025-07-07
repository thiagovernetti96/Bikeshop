import { Repository } from "typeorm";
import { Bike } from "../model/bike";
import { Nota } from "../model/nota";
import {Vendedor} from "../model/vendedor";
import { Cliente } from "../model/cliente";

export class NotaService {
  private notaRepository: Repository<Nota>;
  private bikeRepository: Repository<Bike>;
  private clienteRepository: Repository<Cliente>;
  private vendedorRepository: Repository<Vendedor>;

  constructor(
    notaRepository: Repository<Nota>,
    bikeRepository: Repository<Bike>,
    clienteRepository: Repository<Cliente>,
    vendedorRepository: Repository<Vendedor>
  ) {
    this.notaRepository = notaRepository;
    this.bikeRepository = bikeRepository;
    this.clienteRepository = clienteRepository;
    this.vendedorRepository = vendedorRepository;
  }

 async inserir({
    valor,
    data,
    bikeId,
    clienteId,
    vendedorId
  }: {
  valor: number;
  data: string;
  bikeId: number;
  clienteId: number;
  vendedorId: number;
}): Promise<Nota>{
  const bike = await this.bikeRepository.findOne({ where: { id: bikeId } });
  const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
  const vendedor = await this.vendedorRepository.findOne({ where: { id: vendedorId } });

  if (!bike || !cliente || !vendedor) {
    throw { id: 404, msg: "Bike, cliente ou vendedor não encontrados" };
  }

  const novaNota = this.notaRepository.create({
    valor,
    data,
    bike,
    cliente,
    vendedor
  });

  return await this.notaRepository.save(novaNota);
};


  listar(): Promise<Nota[]> {
    return this.notaRepository.find({
      relations: ["cliente", "vendedor", "bike"],
    });
  }

  buscarporId(id: number): Promise<Nota | undefined> {
    return this.notaRepository.findOne({ where: { id } }).then((nota) => {
      if (!nota) {
        throw ({id:404,msg:"Nota não encontrada"});
      }
      return nota;
    });
  }

  atualizar(id: number, nota: Nota): Promise<Nota | undefined> {
    return this.notaRepository.findOne({ where: { id } }).then((notaExistente) => {
      if (!notaExistente) {
        throw ({id:404,msg:"Nota não encontrada"});
      }
      notaExistente.bike = nota.bike;
      notaExistente.cliente = nota.cliente;
      notaExistente.vendedor = nota.vendedor;
      return this.notaRepository.save(notaExistente);
    });
  }

  deletar (id: number): Promise<void> {
    return this.notaRepository.findOne({ where: { id } }).then((nota) => {
      if (!nota) {
        throw ({id:404,msg:"Nota não encontrada"});
      }
      return this.notaRepository.remove(nota).then(() => {});
    });
  }

 

 
}