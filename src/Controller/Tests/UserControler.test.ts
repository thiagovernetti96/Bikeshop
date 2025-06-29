import { UsuarioController } from '../UsuarioController';
import { UsuarioService } from '../../service/UsuarioService';
import { Request, Response } from 'express';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let mockService: jest.Mocked<UsuarioService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockService = {
      listar: jest.fn(),
      inserir: jest.fn(),
    } as any;
    
    controller = new UsuarioController(mockService);
    
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
    };
  });

  describe('listar', () => {
    it('deve retornar status 200 com lista de usuários', async () => {
      const mockUsers = [{ id: 1, email: 'test@example.com' }];
      mockService.listar.mockResolvedValue(mockUsers);

      await controller.listar(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(mockUsers);
    });
  });

  describe('inserir', () => {
    it('deve criar um novo usuário com status 201', async () => {
      const newUser = { email: 'new@example.com', senha: '123456' };
      const createdUser = { id: 1, ...newUser };
      
      mockRequest.body = newUser;
      mockService.inserir.mockResolvedValue(createdUser);

      await controller.inserir(mockRequest as Request, mockResponse as Response);

      expect(mockService.inserir).toHaveBeenCalledWith(newUser);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject).toEqual(createdUser);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar um usuário existente', async () => {
      const updatedUser = { email: '1223@mail.com', senha: '123456' };
      const mockId = '1';
      mockRequest.params = { id: mockId };
      mockRequest.body = updatedUser;
      const existingUser = { id: 1, ...updatedUser };
      mockService.atualizar = jest.fn().mockResolvedValue(existingUser);
      await controller.atualizar(mockRequest as Request, mockResponse as Response);
      expect(mockService.atualizar).toHaveBeenCalledWith(Number(mockId), updatedUser
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(existingUser);
    });
  });

});