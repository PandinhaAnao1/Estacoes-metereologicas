import EstacaoController from '../../../controllers/estacaoController.js';
import { describe, expect } from '@jest/globals';

jest.mock('../../../services/usuarioService', () => ({
    listar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    cadastrar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    atualizar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    listarPorId: jest.fn().mockRejectedValue(new Error('Erro interno do serviço'))
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Teste que verifica o controller de estações', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Deve retornar erro 500 ao listar estações', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = { body: null };

        await EstacaoController.listar(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
    it('Deve retornar erro 500 ao listar estação por ID', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = { body: null };

        await EstacaoController.listarPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
    it('Deve retornar erro 500 ao cadastrar uma estação', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = { body: null };

        await EstacaoController.cadastrar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);

    });
    it('Deve retornar erro 500 ao atualizar um estação', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = { body: null };

        await EstacaoController.atualizar(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
});
