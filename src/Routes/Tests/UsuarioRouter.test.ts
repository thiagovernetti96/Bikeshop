import request from 'supertest';
import express from 'express';
import { usuarioRouter } from '../UsuarioRouter';
import { UsuarioController } from '../../Controller/UsuarioController';
import { UsuarioService } from '../../service/UsuarioService';

describe('Usuario Router', () => {
  let app: express.Express;
  let mockService: jest.Mocked<UsuarioService>;

  beforeAll(() => {
    mockService = {
      listar: jest.fn(),
      inserir: jest.fn(),
    } as any;
    
    const controller = new UsuarioController(mockService);
    app = express();
    app.use(express.json());
    app.use('/api/usuario', usuarioRouter(controller));
  });

  describe('GET /api/usuario', () => {
    it('deve retornar lista de usuários', async () => {
      const mockUsers = [{ id: 1, email: 'test@example.com' }];
      mockService.listar.mockResolvedValue(mockUsers);

      const response = await request(app).get('/api/usuario');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
    });
  });

  describe('POST /api/usuario', () => {
    it('deve criar um novo usuário', async () => {
      const newUser = { email: 'new@example.com', senha: '123456' };
      const createdUser = { id: 1, ...newUser };
      mockService.inserir.mockResolvedValue(createdUser);

      const response = await request(app)
        .post('/api/usuario')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdUser);
    });
  });
});