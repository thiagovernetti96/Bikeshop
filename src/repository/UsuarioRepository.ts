import {Usuario} from '../model/usuario';

export class UsuarioRepository {
  private usuarios: Usuario[] = [];
  private idCounter: number = 1;

  inserir(usuario: Omit<Usuario, 'id'>): Usuario {
    const newUsuario: Usuario = {
      id: this.idCounter++,
      email: usuario.email,
      senha: usuario.senha
    };
    this.usuarios.push(newUsuario);
    return newUsuario;
  }

  listar(): Usuario[] {
    return this.usuarios;
  }

  buscarporId(id: number): Usuario | undefined {
    return this.usuarios.find(usuario => usuario.id === id);
  }

  atualizar(id: number, usuario: Omit<Usuario, 'id'>): Usuario | undefined {
    const index = this.usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      const updatedUsuario: Usuario = { ...this.usuarios[index], ...usuario };
      this.usuarios[index] = updatedUsuario;
      return updatedUsuario;
    }
    return undefined;
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