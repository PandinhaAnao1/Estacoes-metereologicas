import estacaoController from '../../controllers/estacaoController.js';

import {describe, expect} from '@jest/globals';

jest.mock('../../services/usuarioService.js', () => ({
    listar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    cadastrar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    atualizar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    listarPorId: jest.fn().mockRejectedValue(new Error('Erro interno do serviço'))
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Testando o usuario controller', () => {
    
    it('Deve retornar erro 500 ao listar estações', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = {body: null};

        await estacaoController.listar(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
    it('Deve retornar erro 500 ao listar estação por ID', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = {body: null};

        await estacaoController.listarPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
    it('Deve retornar erro 500 ao cadastrar uma estação', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = {body: null};

        await estacaoController.cadastrar(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
    it('Deve retornar erro 500 ao atualizar um estação', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = {body: null};

        await estacaoController.atualizar(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
});
