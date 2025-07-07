import {Nota} from '../model/nota';
import { AppDataSource } from "../data-source";

export class NotaRepository {
  private notas: Nota[] = [];
  private idCounter: number = 1;
  private source = AppDataSource.getRepository(Nota);

  inserir(nota: Omit<Nota, 'id'>): Nota {
    const newNota: Nota = {
      id: this.idCounter++,
      vendedor: nota.vendedor,
      cliente: nota.cliente,
      bike: nota.bike,
      valor: nota.valor,
      data: nota.data
    };
    this.notas.push(newNota);
    return newNota;
  }
  async listar(): Promise<Nota[]> {
    return await this.source.find({
      relations: ["cliente", "vendedor", "bike"],
    });
  }
  buscarporId(id: number): Nota | undefined {
    return this.notas.find(nota => nota.id === id);
  }
  atualizar(id: number, nota: Omit<Nota, 'id'>): Nota | undefined {
    const index = this.notas.findIndex(n => n.id === id);
    if (index === -1) return undefined;
    const notaAtualizada:Nota={
      id,
      valor:nota.valor,
      data:nota.data
    }
    this.notas[index]=notaAtualizada;
    return notaAtualizada;
  
  }
 
  deletar(id: number): boolean {
    const index = this.notas.findIndex(nota => nota.id === id);
    if (index !== -1) {
      this.notas.splice(index, 1);
      return true;
    }
    return false;
  }
  buscarporVendedorId(vendedorId: number): Nota[] {
    return this.notas.filter(nota => nota.vendedor === vendedorId);
  }
  buscarporClienteId(clienteId: number): Nota[] {
    return this.notas.filter(nota => nota.cliente === clienteId);
  }
  buscarporBikeId(bikeId: number): Nota[] {
    return this.notas.filter(nota => nota.bike === bikeId);
  }
  buscarporData(data: Date): Nota[] {
    return this.notas.filter(nota => nota.data === data);
  }
}