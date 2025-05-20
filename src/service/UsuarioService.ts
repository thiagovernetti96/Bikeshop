import { Repository } from "typeorm";
import {Usuario} from "../model/usuario";

export class UsuarioService {
  private usuarioRepository: Repository<Usuario>;

  constructor(usuarioRepository: Repository<Usuario>) {
    this.usuarioRepository = usuarioRepository;
  }

  inserir(usuario: Usuario): Promise<Usuario> {
    if (!usuario.email || !usuario.senha) {
      throw ({id:400,msg:"Email e senha são obrigatórios"});
    }
    return this.usuarioRepository.save(usuario);
  }

  listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  buscarporId(id: number): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { id } }).then((usuario) => {
      if (!usuario) {
        throw ({id:404,msg:"Usuario não encontrado"});
      }
      return usuario;
    });
  }

  atualizar(id: number, usuario: Usuario): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { id } }).then((usuarioExistente) => {
      if (!usuarioExistente) {
        throw ({id:404,msg:"Usuario não encontrado"});
      }
      usuarioExistente.email = usuario.email;
      usuarioExistente.senha = usuario.senha;
      return this.usuarioRepository.save(usuarioExistente);
    });
  }

  deletar(id: number): Promise<void> {
    return this.usuarioRepository.findOne({ where: { id } }).then((usuario) => {
      if (!usuario) {
        throw ({id:404,msg:"Usuario não encontrado"});
      }
      return this.usuarioRepository.remove(usuario).then(() => {});
    });
  }

  buscarPorEmail(email: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({ where: { email } });
  }

}