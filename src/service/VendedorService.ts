import { Vendedor } from "../model/vendedor";
import { Repository } from "typeorm";

export class VendedorService {
  private vendedorRepository: Repository<Vendedor>;

  constructor(vendedorRepository: Repository<Vendedor>) {
    this.vendedorRepository = vendedorRepository;
  }

  async inserir(vendedor: Vendedor): Promise<Vendedor> {
    if (!vendedor.nome || !vendedor.email) {
      throw({id:400,msg:"Nome e email são obrigatórios"});
    }
    return await this.vendedorRepository.save(vendedor);
  }

  async listar(): Promise<Vendedor[]> {
    return await this.vendedorRepository.find();
  }

  async buscarporId(id: number): Promise<Vendedor | undefined> {
    let vendedor = await this.vendedorRepository.findOne({ where: { id } });
    if (!vendedor) {
      throw({id:404,msg:"Vendedor não encontrado"});
    }
    return vendedor;
  }

  async atualizar(id: number, vendedor: Vendedor): Promise<Vendedor | undefined> {
    let vendedorExistente = await this.vendedorRepository.findOne({ where: { id } });
    if (!vendedorExistente) {
      throw({id:404,msg:"Vendedor não encontrado"});
    } else {
      vendedorExistente.nome = vendedor.nome;
      vendedorExistente.email = vendedor.email;
      return await this.vendedorRepository.save(vendedorExistente);
    }
  }

  async deletar(id: number): Promise<void> {
    let vendedor = await this.vendedorRepository.findOne({ where: { id } });
    if (!vendedor) {
      throw({id:404,msg:"Vendedor não encontrado"});
    }
    await this.vendedorRepository.remove(vendedor);
  }

  async buscarPorNome(nome: string): Promise<Vendedor[]> {
    return await this.vendedorRepository.find({ where: { nome } });
  }

  async buscarPorEmail(email: string): Promise<Vendedor[]> {
    return await this.vendedorRepository.find({ where: { email } });
  }

}