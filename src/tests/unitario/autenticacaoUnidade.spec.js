import AutenticacaoServices from '../../services/autenticacaoSevices.js';
import UsuarioRepository from '../../repositories/usuarioRepository.js';
import Hashsenha from '../../util/hashSenha.js';
import Jwt from 'jsonwebtoken';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('../../repositories/usuarioRepository.js', () => ({
  findMany: jest.fn(),
}));

jest.mock('../../util/hashSenha.js', () => ({
  compararSenha: jest.fn(),
}));

describe('AutenticacaoServices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Deve autenticar e criar token de um usuario', () => {
    it('Deve realizar log com sucesso', () => {
      let email = "emailTeste@gmail.com";
      let senha = 'SenhaForte123';

      //Retiarar senha do token
      let tokenTest = Jwt.sign({ email, senha }, process.env.JWT_SECRET, { expiresIn: '30d' });

      UsuarioRepository.findMany.mockResolvedValueU([{
        id: 1,
        nome: 'Usuario teste de unidade',
        email: email
      }]);

      const resultado = AutenticacaoServices.login(email);
      expect(token).toBe('token_mock');
    });

    it('deve lançar erro se os dados forem inválidos', async () => {
      const data = { email: 'invalido', senha: '123' };

      await expect(AutenticacaoServices.criarToken(data))
        .rejects
        .toEqual(expect.objectContaining({
          message: expect.any(Array),
          code: 400,
          error: true,
        }));
    });

    it('deve lançar erro se a senha for inválida', async () => {
      const data = { email: 'teste@example.com', senha: 'Senha123!' };
      const usuarioMock = [{ email: 'teste@example.com', senha: 'hash' }];
      UsuarioRepository.findMany.mockResolvedValue(usuarioMock);
      Hashsenha.compararSenha.mockResolvedValue(false);

      await expect(AutenticacaoServices.criarToken(data))
        .rejects
        .toEqual({
          message: "Senha Invalida!",
          code: 400,
          error: true,
        });
    });
  });
});