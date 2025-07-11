import {Usuario} from '../model/usuario';

export class UsuarioRepository {
  private usuarios: Usuario[] = [];
  private idCounter: number = 1;

  inserir(usuario: Omit<Usuario, 'id'>):Promise<Usuario> {
    const newUsuario: Usuario = {
      id: this.idCounter++,
      email: usuario.email,
      senha: usuario.senha
    };
    this.usuarios.push(newUsuario);
    return Promise.resolve(newUsuario);;
  }

  listar(): Usuario[] {
    return this.usuarios;
  }

  buscarporId(id: number): Usuario | undefined {
    return this.usuarios.find(usuario => usuario.id === id);
  }

  atualizar(id: number, usuario: Omit<Usuario, 'id'>): Usuario | undefined {
    const index = this.usuarios.findIndex(u => u.id === id);
    if (index === -1) return undefined;
    const usuarioAtualizado:Usuario={
      id,
      email:usuario.email,
      senha:usuario.senha
    }
    this.usuarios[index]=usuarioAtualizado;
    return usuarioAtualizado;
  }

  deletar(id: number): boolean {
    const index = this.usuarios.findIndex(usuario => usuario.id === id);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      return true;
    }
    return false;
  }

  buscarporEmail(email: string): Usuario[] {
    return this.usuarios.filter(usuario => usuario.email === email);
  }

}