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

  inserir(nota: Nota): Promise<Nota> {
    if (!nota.bikeId || !nota.clienteId || !nota.vendedorId) {
      throw ({id:404,msg:"Bike, cliente e vendedor são obrigatórios"});
    }
    return this.notaRepository.save(nota);
  }

  listar(): Promise<Nota[]> {
    return this.notaRepository.find();
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
      notaExistente.bikeId = nota.bikeId;
      notaExistente.clienteId = nota.clienteId;
      notaExistente.vendedorId = nota.vendedorId;
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

  buscarNotaPorCliente(clienteId: number): Promise<Nota[]> {
    return this.notaRepository.find({ where: { clienteId } });
  }

  buscarNotaPorBike(bikeId: number): Promise<Nota[]> {
    return this.notaRepository.find({ where: { bikeId } });
  }

  buscarNotaPorVendedor(vendedorId: number): Promise<Nota[]> {
    return this.notaRepository.find({ where: { vendedorId } });
  }
}