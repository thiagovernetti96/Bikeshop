import { Request, Response } from 'express';
import { UsuarioService } from '../service/UsuarioService';

export class UsuarioController {
  private service: UsuarioService;

  constructor(service: UsuarioService) {
    this.service = service;
  }

  inserir = async (req: Request, res: Response): Promise<void> => {
    const { email, senha } = req.body;
    console.log('Dados recebidos:', req.body);
    try{ 
      const novoUsuario = await this.service.inserir({ email, senha });
      res.status(201).json(novoUsuario);
    }
    catch(err:any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  listar = async (_req: Request, res: Response): Promise<void> => {
    const usuarios = await this.service.listar();
    res.json(usuarios);
  };

  atualizar = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { email, senha } = req.body;
    try {
      const usuarioAtualizado = await this.service.atualizar(Number(id), { email, senha });
      res.json(usuarioAtualizado);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  }

  deletar = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      await this.service.deletar(Number(id));
      res.sendStatus(204);
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };

  buscarPorEmail = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.params;
    try {
      const usuarios = await this.service.buscarPorEmail(email);
      if (usuarios.length === 0) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.json(usuarios);
      }
    } catch (err: any) {
      res.status(err.id).json({ error: err.msg });
    }
  };
}