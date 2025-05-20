import {Vendedor} from '../model/vendedor';

export class VendedorRepository {
  private vendedores: Vendedor[] = [];
  private idCounter: number = 1;

  inserir (vendedor: Omit<Vendedor, 'id'>): Vendedor {
    const newVendedor: Vendedor = {
      id: this.idCounter++,
      nome: vendedor.nome,
      email: vendedor.email
    };
    this.vendedores.push(newVendedor);
    return newVendedor;
  }

  listar (): Vendedor[] {
    return this.vendedores;
  }
  buscarporId (id: number): Vendedor | undefined {
    return this.vendedores.find(vendedor => vendedor.id === id);
  }
  atualizar (id: number, vendedor: Omit<Vendedor, 'id'>): Vendedor | undefined {
    const index = this.vendedores.findIndex(v => v.id === id);
    if (index !== -1) {
      const updatedVendedor: Vendedor = { ...this.vendedores[index], ...vendedor };
      this.vendedores[index] = updatedVendedor;
      return updatedVendedor;
    }
    return undefined;
  }
}