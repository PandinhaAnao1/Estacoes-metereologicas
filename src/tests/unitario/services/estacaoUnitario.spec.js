import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
import EstacaoService from '../../../services/estacaoService.js';
import EstacaoRepository from '../../../repositories/estacaoRepository.js';
import UsuarioRepository from '../../../repositories/usuarioRepository.js';
import { z, ZodError } from 'zod';
import { APIErro } from '../../../util/apiErrro.js';

jest.mock('../../../repositories/estacaoRepository.js', () => ({
    findMany: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    countItens: jest.fn(),
}));

jest.mock('../../../repositories/usuarioRepository.js', () => ({
    findById: jest.fn()
}));

describe('EstacaoService', () => {
    let estacao;
    let filtroValido;
    let filtroInvalido;
    let estacoesPaginado;
    let dados; 
    let usuario;
    let id;

 
    beforeEach(() => {
        id = 1;
        filtroValido = { status: 'ativo' };
        filtroInvalido = { latitude: 'inválido' };
        usuario = { id: 1, nome: 'Usuário Teste', email: 'usuario.teste@example.com' };   
        dados = {
            nome: 'Novo Nome',
            latitude: -23.555555,
            longitude: -46.666666
        };
        estacao =  {
            id: 1,
            nome: 'Estação Teste',
            endereco: 'Rua Teste, 123',
            latitude: -23.550520,
            longitude: -46.633308,
            ip: '192.168.0.1',
            status: 'ativo',
            usuario_id: 1
        };
        estacoesPaginado = [
            {
                id: 1,
                nome: 'Estação Teste 1',
                endereco: 'Rua Teste 1, 123',
                latitude: -23.550520,
                longitude: -46.633308,
                ip: '192.168.0.1',
                status: 'ativo',
                usuario_id: 1
            },
            {
                id: 2,
                nome: 'Estação Teste 2',
                endereco: 'Rua Teste 2, 456',
                latitude: -23.551520,
                longitude: -46.634308,
                ip: '192.168.0.2',
                status: 'inativo',
                usuario_id: 2
            }
        ];
    });
  
    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    describe('listarPorId', () => {
      
        describe('Sucesso', () => {});

        describe('Erro', () => {
            it('Deve retornar erro: "Estação não encontrada."', async () => {
                try {
                    await EstacaoService.listarPorID({ id: 44454 });
                } catch (error) {
                    if (error instanceof APIErro) {
                        const errorMessages = error.errors.map((err) => ({
                            path: err.path,
                            message: err.message,
                        }));
                        expect(errorMessages).toEqual([
                            { path: "id", message: "Estação não encontrada." }
                        ]);
                    } else {
                        throw error; 
                    }
                }
            });

            it('Deve retornar erro: "Id informado não é do tipo number."', async () => {
                try {
                    await EstacaoService.listarPorID({ id: 'errado' });
                } catch (error) {
                    expect(error.errors).toBeDefined();
                    expect(error.errors[0].message).toBe("Id informado não é do tipo number.");
                    expect(error.errors[0].path).toEqual(["id"]);
                    expect(error.errors[0].code).toBe("invalid_type");
                }
            });
        });
    });

    describe('listar', () => {
        describe('Erro', () => {
            it('Deve lançar erro de validação para filtros inválidos.', async () => {
                await expect(EstacaoService.listar(filtroInvalido))
                    .rejects
                    .toBeInstanceOf(z.ZodError);

                expect(EstacaoRepository.findMany).not.toHaveBeenCalled();
            });

            it('Deve lançar erro de quando não é encontrada uma estação.', async () => {
                EstacaoRepository.countItens.mockResolvedValue(0);

                await expect(EstacaoService.listar({}))
                    .rejects
                    .toBeInstanceOf(APIErro);

                expect(EstacaoRepository.findMany).not.toHaveBeenCalled();
            });
        });
    });

    describe('atualizar', () => {
      

        beforeEach(() => {
            jest.clearAllMocks();
        });

        describe('Sucesso', () => {
            it('Deve atualizar uma estação com sucesso.', async () => {
                EstacaoRepository.findById.mockResolvedValue(estacao);
                EstacaoRepository.update.mockResolvedValue({
                    ...estacao,
                    ...dados
                });

                const resultado = await EstacaoService.atualizar({ id: id }, dados);

                expect(EstacaoRepository.findById).toHaveBeenCalledWith(id);
                expect(EstacaoRepository.update).toHaveBeenCalledWith(id, expect.objectContaining(dados));
                expect(resultado).toEqual(expect.objectContaining(dados));
            });
        });

        describe('Erro', () => {
            it('Deve lançar erro se a estação não for encontrada.', async () => {
                EstacaoRepository.findById.mockResolvedValue(null);

                await expect(EstacaoService.atualizar({ id: id }, dados))
                    .rejects
                    .toEqual({
                        error: true,
                        code: 400,
                        message: "Estação não encontrado.",
                    });

                expect(EstacaoRepository.findById).toHaveBeenCalledWith(id);
                expect(EstacaoRepository.update).not.toHaveBeenCalled();
            });

            it('Deve lançar erro de validação para dados inválidos.', async () => {
                const dadosInvalidos = {
                    latitude: 'invalido',
                };

                await expect(EstacaoService.atualizar(id, dadosInvalidos))
                    .rejects
                    .toEqual(expect.objectContaining({
                        error: true,
                        code: 400,
                    }));

                expect(EstacaoRepository.findById).not.toHaveBeenCalled();
                expect(EstacaoRepository.update).not.toHaveBeenCalled();
            });

            it('Deve lançar erro ao não conseguir atualizar a estação.', async () => {
                EstacaoRepository.findById.mockResolvedValue(estacao);
                EstacaoRepository.update.mockResolvedValue(null);

                await expect(EstacaoService.atualizar({ id: id }, dados))
                    .rejects
                    .toEqual({
                        error: true,
                        code: 400,
                        message: "Não foi possível atualizar estação.",
                    });

                expect(EstacaoRepository.findById).toHaveBeenCalledWith(id);
                expect(EstacaoRepository.update).toHaveBeenCalledWith(id, expect.objectContaining(dados));
            });
        });
    });
});