import {Cliente}from "../model/cliente";

export class ClienteRepository {
  private clientes: Cliente[] = [];
  private idCounter: number = 1;

  inserir(cliente: Omit<Cliente, 'id'>): Cliente {
    const newCliente: Cliente = {
      id: this.idCounter++,
      nome: cliente.nome,
      email: cliente.email
    };
    this.clientes.push(newCliente);
    return newCliente;
  }

  listar(): Cliente[] {
    return this.clientes;
  }

  buscarporId(id: number): Cliente | undefined {
    return this.clientes.find(cliente => cliente.id === id);
  }

  atualizar(id: number, cliente: Omit<Cliente, 'id'>): Cliente | undefined {
    const index = this.clientes.findIndex(c => c.id === id);
    if(index===-1)return undefined;
    const clienteAtualizado:Cliente={
      id,
      nome:cliente.nome,
      email:cliente.email,      
    }
    this.clientes[index]= clienteAtualizado;
    return clienteAtualizado
  }
}