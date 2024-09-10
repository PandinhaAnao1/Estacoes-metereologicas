import { describe, expect, test } from '@jest/globals';
import bcrypt from 'bcryptjs'
import usuarioService from '../../services/usuarioService.js';
import usuarioRepository from '../../repositories/usuarioRepository.js';


beforeEach(() => {
    usuarioRepository.findById = jest.fn(); 
  });
  

jest.mock('../../repositories/usuarioRepository.js', () => ({
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
}));

jest.mock('bcryptjs', () => ({
    hash: jest.fn().mockResolvedValue('$2a$10$sAYH1jr9ohI8spU0ENZFXe1NJcJg/UQRbvYzHQT1jbBUIASrg00am')
}));


describe('UsuarioService.listar', () => {
    it('Deve retornar usuários válidos quando o filtro é correto', async () => {
        const usuarioMock = [{ id: 1, nome: 'John', email: 'john@example.com', senha: 'secret' }];
        usuarioRepository.findMany.mockResolvedValue(usuarioMock);

        const filtro = { id: 1 };
        const result = await usuarioService.listar(filtro);

        expect(result).toEqual([{ id: 1, nome: 'John', email: 'john@example.com' }]); // senha excluída
    });

    it('Deve lançar erro de validação se o filtro for inválido', async () => {
        const filtroInvalido = { id: 'invalido' };
        
        await expect(usuarioService.listar(filtroInvalido)).rejects.toEqual({
            error: true,
            code: 400,
            message: [{ path: 'id', message: 'Id informado não é do tipo number.' }],
        });
    });

    it('Deve lançar erro se nenhum usuário for encontrado', async () => {
        usuarioRepository.findMany.mockResolvedValue([]);

        const filtro = { id: 999 };
        
        await expect(usuarioService.listar(filtro)).rejects.toEqual({
            error: true,
            code: 400,
            message: 'Nenhum usuário encontrado.',
        });
    });
});

describe('UsuarioService.inserir', () => {
    it('Deve inserir um usuário válido', async () => {
        const data = { nome: 'John', email: 'john@example.com', senha: 'StrongPass1!' };
        const mockUsuario = { id: 1, nome: 'John', email: 'john@example.com' };
        usuarioRepository.findMany.mockResolvedValue([]); // Email não repetido
        usuarioRepository.create.mockResolvedValue(mockUsuario);

        const result = await usuarioService.inserir(data);

        expect(result).toEqual(mockUsuario);
    });

    it('Deve lançar erro se o email já estiver cadastrado', async () => {
        const data = { nome: 'John', email: 'john@example.com', senha: 'StrongPass1!' };
        usuarioRepository.findMany.mockResolvedValue([data]); // Email repetido
        
        await expect(usuarioService.inserir(data)).rejects.toEqual({
            error: true,
            code: 400,
            message: 'Email já cadastrado.',
        });
    });
});

describe('UsuarioService.atualizar', () => {
    it('Deve atualizar um usuário com dados válidos', async () => {
        const id = 1;
        const data = { nome: 'John Updated', email: 'johnupdated@example.com' };
        const mockUsuario = { id: 1, nome: 'John Updated', email: 'johnupdated@example.com' };
        
        usuarioRepository.findById.mockResolvedValue(mockUsuario);
        usuarioRepository.update.mockResolvedValue(mockUsuario);
        
        const result = await usuarioService.atualizar(id, data);
        
        expect(result).toEqual(mockUsuario);
    });

    it('Deve lançar erro se o usuário não for encontrado', async () => {
        const id = 999;
        const data = { nome: 'John Updated' };
        
        usuarioRepository.findById.mockResolvedValue(null);
        
        await expect(usuarioService.atualizar(id, data)).rejects.toEqual({
            error: true,
            code: 400,
            message: 'Usuário não encontrado.',
        });
    });

    it('Deve lançar erro se o email já estiver em uso', async () => {
        const id = 1;
        const data = { email: 'used@example.com' };
        usuarioRepository.findMany.mockResolvedValue([{ id: 2, email: 'used@example.com' }]); // Email repetido
        
        await expect(usuarioService.atualizar(id, data)).rejects.toEqual({
            error: true,
            code: 400,
            message: 'Email já cadastrado.',
        });
    });
});

describe('usuarioService.deletar', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    test('Deve lançar erro de validação se o ID for inválido', async () => {
        const idInvalido = 'abc'; // ID que não é um número
        
        await expect(usuarioService.deletar(idInvalido)).rejects.toEqual({
            error: true,
            code: 400,
            message: [
                {
                    message: 'Expected object, received string',
                    path: undefined,
                },
            ],
        });
    });
    
    test('Deve lançar erro de validação se o ID não for um número inteiro', async () => {
        const idInvalido = 3.5; // ID que não é inteiro
        
        await expect(usuarioService.deletar(idInvalido)).rejects.toEqual({
            error: true,
            code: 400,
            message: [
                {
                    message: 'Expected object, received number',
                    path: undefined,
                },
            ],
        });
    });
    
    test('Deve lançar erro de validação se o ID não for positivo', async () => {
        const idInvalido = -1; // ID negativo
        
        await expect(usuarioService.deletar(idInvalido)).rejects.toEqual({
            error: true,
            code: 400,
            message: [
                {
                    message: 'Expected object, received number',
                    path: undefined,
                },
            ],
        });
    });
    
    test('Deve lançar erro se o usuário não for encontrado', async () => {
        // Mock para simular que o usuário não foi encontrado
        usuarioRepository.findById.mockResolvedValue(null);
    
        const id = 999;
        await expect(usuarioService.deletar(id)).rejects.toEqual({
            error: true,
            code: 400,
            message: [
                {
                    message: 'Expected object, received number',
                    path: undefined,
                },
            ],
        });
    });
    
    test('Deve lançar erro se ocorrer um problema interno ao deletar o usuário', async () => {
        const mockUsuario = { id: 1, nome: 'João', senha: 'senha123' };
    
        // Mock para simular que o usuário foi encontrado
        usuarioRepository.findById.mockResolvedValue(mockUsuario);
        // Mock para simular um erro interno ao tentar deletar o usuário
        usuarioRepository.delete.mockResolvedValue(null);
    
        const id = 1;
        await expect(usuarioService.deletar(id)).rejects.toEqual({
            error: true,
            code: 400,
            message: [
                {
                    message: 'Expected object, received number',
                    path: undefined,
                },
            ],
        });
    });
});    
