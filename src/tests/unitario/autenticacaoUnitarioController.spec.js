import Autenticacao from '../../controllers/autenticacaoController.js';

import { describe, expect } from '@jest/globals';

jest.mock('../../services/autenticacaoSevices', () => ({
    criarToken: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Testando o autenticacao controller', () => {

    it('Deve retornar erro 500 ao criar token', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = { body: null };

        await Autenticacao.login(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

    });
});