import {Nota} from '../model/nota';

export class NotaRepository {
  private notas: Nota[] = [];
  private idCounter: number = 1;

  inserir(nota: Omit<Nota, 'id'>): Nota {
    const newNota: Nota = {
      id: this.idCounter++,
      vendedorId: nota.vendedorId,
      clienteId: nota.clienteId,
      bikeId: nota.bikeId,
      valor: nota.valor,
      data: nota.data
    };
    this.notas.push(newNota);
    return newNota;
  }
  listar(): Nota[] {
    return this.notas;
  }
  buscarporId(id: number): Nota | undefined {
    return this.notas.find(nota => nota.id === id);
  }
  atualizar(id: number, nota: Omit<Nota, 'id'>): Nota | undefined {
    const index = this.notas.findIndex(n => n.id === id);
    if (index !== -1) {
      const updatedNota: Nota = { ...this.notas[index], ...nota };
      this.notas[index] = updatedNota;
      return updatedNota;
    }
    return undefined;
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
    return this.notas.filter(nota => nota.vendedorId === vendedorId);
  }
  buscarporClienteId(clienteId: number): Nota[] {
    return this.notas.filter(nota => nota.clienteId === clienteId);
  }
  buscarporBikeId(bikeId: number): Nota[] {
    return this.notas.filter(nota => nota.bikeId === bikeId);
  }
  buscarporData(data: Date): Nota[] {
    return this.notas.filter(nota => nota.data === data);
  }
}