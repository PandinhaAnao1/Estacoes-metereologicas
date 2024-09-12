import usuarioController from '../../controllers/usuarioController.js';

import {describe, expect} from '@jest/globals';

jest.mock('../../services/usuarioService.js', () => ({
    listar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    cadastrar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    atualizar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    deletar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    listarPorId: jest.fn().mockRejectedValue(new Error('Erro interno do serviço'))
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Testando o usuario controller', () => {
    
    it('Deve retornar erro 500 ao listar usuarios', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = {body: null};

        await usuarioController.listar(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
    it('Deve retornar erro 500 ao listar usuarios por ID', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = {body: null};

        await usuarioController.listarPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
    it('Deve retornar erro 500 ao cadastrar um usuario', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = {body: null};

        await usuarioController.cadastrar(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
    it('Deve retornar erro 500 ao deletar um usuario', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = {body: null};

        await usuarioController.deletar(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
    it('Deve retornar erro 500 ao atualizar um usuario', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = {body: null};

        await usuarioController.atualizar(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
});
