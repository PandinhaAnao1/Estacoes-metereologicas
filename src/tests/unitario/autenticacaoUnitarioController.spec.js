import Autenticacao from '../../controllers/autenticacaoController.js';
import AutenticacaoServices from '../../services/autenticacaoSevices.js';

import { describe, expect } from '@jest/globals';

jest.mock('../../services/autenticacaoSevices', () => ({
    login: jest.fn().mockRejectedValue(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Testando o autenticação controller', () => {

    it('Deve retornar erro 500 ao criar token', async () => {
        const erroMock = new Error('Ocorreu um erro interno no servidor');
        const res = { 
            status: jest.fn(() => ({ json: jest.fn() })) 
        };
        AutenticacaoServices.login = jest.fn().mockRejectedValue(erroMock);

        await Autenticacao.login({ body: null }, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});
