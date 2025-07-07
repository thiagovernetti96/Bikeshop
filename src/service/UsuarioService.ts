import { Repository } from "typeorm";
import {Usuario} from "../model/usuario";

export class UsuarioService {
  private usuarioRepository: Repository<Usuario>;

  constructor(usuarioRepository: Repository<Usuario>) {
    this.usuarioRepository = usuarioRepository;
  }

  async inserir(usuario: Usuario): Promise<Usuario> {
    if (!usuario.email || !usuario.senha) {
      throw ({id:400,msg:"Email e senha são obrigatórios"});
    }
    return this.usuarioRepository.save(usuario);
  }

 async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async buscarporId(id: number): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { id } }).then((usuario) => {
      if (!usuario) {
        throw ({id:404,msg:"Usuario não encontrado"});
      }
      return usuario;
    });
  }

  async atualizar(id: number, usuario: Usuario): Promise<Usuario | undefined> {
    let usuarioExistente = await this.usuarioRepository.findOne({ where: { id } });
    console.log(usuarioExistente);
    if (!usuarioExistente) {
      throw ({ id: 404, msg: "usuario não encontrado" });
    } else {
      usuarioExistente.email = usuario.email;
      usuarioExistente.senha = usuario.senha;
  
      return await this.usuarioRepository.save(usuarioExistente);
    }
  }

 async deletar(id: number): Promise<void> {
    return this.usuarioRepository.findOne({ where: { id } }).then((usuario) => {
      if (!usuario) {
        throw ({id:404,msg:"Usuario não encontrado"});
      }
      return this.usuarioRepository.remove(usuario).then(() => {});
    });
  }

  async buscarPorEmail(email: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({ where: { email } });
  }

}