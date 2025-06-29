import { UsuarioService } from '../UsuarioService';
import { AppDataSource } from '../../data-source';
import { Usuario } from '../../model/usuario';

// Mock do repositório
jest.mock('../../data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      atualizar:jest.fn()
    }),
  },
}));

describe('UsuarioService', () => {
  let service: UsuarioService;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = AppDataSource.getRepository(Usuario);
    service = new UsuarioService(mockRepository);
  });

  describe('listar', () => {
    it('deve retornar uma lista de usuários', async () => {
      const mockUsers = [{ id: 1, email: 'test@example.com' }];
      mockRepository.find.mockResolvedValue(mockUsers);

      const result = await service.listar();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('inserir', () => {
    it('deve inserir um novo usuário', async () => {
      const userData = { email: 'new@example.com', senha: '123456' };
      const mockUser = { id: 1, ...userData };
      
      mockRepository.create.mockReturnValue(mockUser);
      mockRepository.save.mockResolvedValue(mockUser);

      const result = await service.inserir(userData);

      expect(mockRepository.create).toHaveBeenCalledWith(userData);
      expect(mockRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('atualizar',()=>{
    it('deve atualizar um usuário',async()=>{
      const mockUsers = [{ id: 1, email: 'test@example.com',senha:'12345' }];
      mockRepository.find.mockResolvedValue(mockUsers);
      const userUpdated = await service.atualizar(mockUsers[0].id, mockUsers[0]);
      expect(mockRepository.find).toHaveBeenCalledWith({ where: { id: mockUsers[0].id } });
      expect(mockRepository.save).toHaveBeenCalledWith(mockUsers[0]);
    });
  });
});
