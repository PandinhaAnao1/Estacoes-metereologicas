import { json } from 'express';
import EstacaoController from '../../../controllers/estacaoController.js';
import EstacaoService from '../../../services/estacaoService.js';
import { describe, expect } from '@jest/globals';
import { APIErro } from '../../../util/apiErrro.js';

jest.mock('../../../services/usuarioService', () => ({
    listar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    cadastrar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    atualizar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    listarPorId: jest.fn().mockRejectedValue(new Error('Erro interno do serviço'))
}));

jest.mock('../../../services/estacaoService.js', () => ({
    listar: jest.fn(),
    inserir: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Teste que verifica o controller de estações', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            query: {}
        };

        res = {
            header: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
    });

    describe('GET /estacoes', () => {
        describe('500', () => {
            it('Deve retornar erro 500 ao listar estações', async () => {
                EstacaoService.listar.mockRejectedValue(new Error('Erro interno do serviço'));

                await EstacaoController.listar(req, res);

                expect(res.status).toHaveBeenCalledWith(500);
            });

            it('Deve retornar erro 500 ao listar estação por ID', async () => {
    

                await EstacaoController.listarPorId(req, res);

                expect(res.status).toHaveBeenCalledWith(500);
            });
        });
    });

    describe('POST /estacoes', () => {
        describe('400', () => {
            it('Deve retornar erro 400 ao cadastrar uma estação', async () => {
                EstacaoService.inserir.mockRejectedValue({ error: 'Erro ao cadastrar estação', code: 400 });

                await EstacaoController.cadastrar(req, res);

                expect(res.status).toHaveBeenCalledWith(400);
            });
        });

        describe('500', () => {
            it('Deve retornar erro 500 quando ocorrer um erro inesperado', async () => {
                const error = new Error('Erro no servidor');
                EstacaoService.inserir = jest.fn().mockRejectedValue(error);

                await EstacaoController.cadastrar(req, res);
                expect(res.status).toHaveBeenCalledWith(500);
            });
        });
    });

    describe('PATCH /estacoes', () => {
        describe('500', () => {
            it('Deve retornar erro 500 ao atualizar um estação', async () => {
     
                await EstacaoController.atualizar(req, res);

                expect(res.status).toHaveBeenCalledWith(500);
            });
        });
    });
});
