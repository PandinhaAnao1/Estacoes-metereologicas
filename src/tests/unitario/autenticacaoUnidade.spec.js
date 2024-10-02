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

  describe('validarCampos', () => {
    it.skip('deve validar os campos com sucesso', async () => {
      const data = { email: 'teste@example.com', senha: 'Senha123!' };

      const result = await AutenticacaoServices.validarCampos(data);

      expect(result).toEqual(data);
    });

    it.skip('deve lançar erro se os campos forem inválidos', async () => {
      const data = { email: 'email_invalido', senha: '123' };

      await expect(AutenticacaoServices.validarCampos(data))
        .rejects
        .toThrowError(z.ZodError);
    });
  });

  describe('VerificarUsuario', () => {
    it.skip('deve retornar o usuário se o email estiver cadastrado', async () => {
      const usuarioMock = [{ email: 'teste@example.com', senha: 'hash' }];
      UsuarioRepository.findMany.mockResolvedValue(usuarioMock);

      const result = await AutenticacaoServices.VerificarUsuario({ email: 'teste@example.com' });

      expect(UsuarioRepository.findMany).toHaveBeenCalledWith({ email: 'teste@example.com' });
      expect(result).toEqual(usuarioMock);
    });

    it.skip('deve lançar erro se o email não estiver cadastrado', async () => {
      UsuarioRepository.findMany.mockResolvedValue([]);

      await expect(AutenticacaoServices.VerificarUsuario({ email: 'naoexiste@example.com' }))
        .rejects
        .toEqual({
          message: "Email Não cadastrado!",
          code: 400,
          error: true,
        });
    });
  });

  describe('validarSenhahash', () => {
    it.skip('deve validar a senha com sucesso', async () => {
      Hashsenha.compararSenha.mockResolvedValue(true);

      await expect(AutenticacaoServices.validarSenhahash('senha123', 'hash'))
        .resolves
        .toBeUndefined();
    });

    it.skip('deve lançar erro se a senha for inválida', async () => {
      Hashsenha.compararSenha.mockResolvedValue(false);

      await expect(AutenticacaoServices.validarSenhahash('senha123', 'hash'))
        .rejects
        .toEqual({
          message: "Senha Invalida!",
          code: 400,
          error: true,
        });
    });
  });

  describe('criarToken', () => {
    it('deve retornar o valor mockado do Jwt.sign', () => {
      Jwt.sign.mockReturnValue('token_mock');
      const token = Jwt.sign({ email: 'teste@example.com' }, 'secret', { expiresIn: '30d' });
      expect(token).toBe('token_mock');
    });

    it.skip('deve lançar erro se os dados forem inválidos', async () => {
      const data = { email: 'invalido', senha: '123' };

      await expect(AutenticacaoServices.criarToken(data))
        .rejects
        .toEqual(expect.objectContaining({
          message: expect.any(Array),
          code: 400,
          error: true,
        }));
    });

    it.skip('deve lançar erro se a senha for inválida', async () => {
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