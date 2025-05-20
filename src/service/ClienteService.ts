import { Repository } from "typeorm";
import {Cliente} from "../model/cliente";

export class ClienteService {
  private clienteRepository: Repository<Cliente>;
  repository: any;
  constructor(clienteRepository: Repository<Cliente>) {
    this.clienteRepository = clienteRepository;
  }

  async inserir(cliente:Cliente): Promise<Cliente> {
    if(!cliente.nome || !cliente.email) {
      throw ({id:404,msg:"Nome e email são obrigatórios"});
    }
    return await this.clienteRepository.save(cliente);
  }


  async listar(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }


  async buscarporId(id: number): Promise<Cliente | undefined> {
    let cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) {
      throw({id:404,msg:"Cliente não encontrado"});
    }
    return cliente;
  }
  
  async atualizar(id: number, cliente: Cliente): Promise<Cliente | undefined> {
    let clienteExistente = await this.clienteRepository.findOne({ where: { id } });
    console.log(clienteExistente);
    if (!clienteExistente) {
      throw({id:404,msg:"Cliente não encontrado"});
    }
      else {
      clienteExistente.nome = cliente.nome;
      clienteExistente.email = cliente.email;
      return await this.repository.save(clienteExistente);
    }
    
  }
  async deletar(id: number): Promise<void> {
    let cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) {
      throw ({id:404,msg:"Cliente não encontrado"});
    }
    await this.clienteRepository.remove(cliente);
  }

  async buscarPorNome(nome: string): Promise<Cliente[]> {
    return await this.clienteRepository.find({ where: { nome } });
  }

  async buscarPorEmail(email: string): Promise<Cliente[]> {
    return await this.clienteRepository.find({ where: { email } });
  }

}
