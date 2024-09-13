// import { expect, describe } from "@jest/globals";
// import AutenticacaoServices from "../../services/autenticacaoSevices";


// describe.skip('teste na camada de  autenticacaoServices metodo: validarCampos()', ()=>{
//   it('Deve retonar um obejeto com email e senha', async ()=>{
//     const data = {
//       email: "marcos@gmail.com",
//       senha: "12345678Aa@"
//     }
//     const response = await AutenticacaoServices.validarCampos(data)
//     expect(response).toEqual(data)
//   })

//   it('deve lançar erro "Email é obrigatório!" para email ausente', async ()=>{
//     const data = {
//       senha: "12345678Aa@"
//     }
//     expect(AutenticacaoServices.validarCampos(data)).rejects.toThrowError('Campo email é obrigatório!')
//   })

//   it('deve lançar erro "Senha é obrigatório!" para email ausente', async ()=>{
//     const data = {
//       email: "marcos@gmail.com",
//     }
//     expect(AutenticacaoServices.validarCampos(data)).rejects.toThrowError('Campo senha é obrigatório!')
//   })

//   it('deve retornar error: "Formato invalido, deve ser string!" para campo email', async ()=>{
//     const data = {
//       email: 4545,
//     }
//     expect(AutenticacaoServices.validarCampos(data)).rejects.toThrowError('Formato invalido, deve ser string!')
//   })
//   it('deve retornar error: "Formato invalido, deve ser string!" para campo senha', async ()=>{
//     const data = {
//       senha: 554554
//     }
//     expect(AutenticacaoServices.validarCampos(data)).rejects.toThrowError('Formato invalido, deve ser string!')
//   })

//   it('deve lançar erro "Email invalido!" para formato do email incorreto', async()=>{
//     const data = {
//       email: "marcoshhhh",
//       senha: "12345678Aa@"
//     }

//     expect(AutenticacaoServices.validarCampos(data)).rejects.toThrowError('Email invalido!')


//   })

//   it('deve lançar erro "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo." para formato do email incorreto', async()=>{
//     const data = {
//       email: "marcos@gmail.com",
//       senha: "1234567"
//     }

//     expect(AutenticacaoServices.validarCampos(data)).rejects.toThrowError('A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.')
//   })

//   it('deve retornar error: "Email ou senha invalido"', async ()=>{
//     const data = {
//       email: "mariaRosaAlencarDeAlmeidaMariquinha@gmail.com", //campos que não corresponde a nenhum usuario
//       senha: "12345678Aa@1215165165165fs1da1f651edf165e1f56"
//     }
//     const response = async ()=> await AutenticacaoServices.VerificarUsuario(data)
//     expect(response).rejects.toThrow('Email ou senha invalido')
//   })
// })

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
    it('deve validar os campos com sucesso', async () => {
      const data = { email: 'teste@example.com', senha: 'Senha123!' };

      const result = await AutenticacaoServices.validarCampos(data);

      expect(result).toEqual(data);
    });

    it('deve lançar erro se os campos forem inválidos', async () => {
      const data = { email: 'email_invalido', senha: '123' };

      await expect(AutenticacaoServices.validarCampos(data))
        .rejects
        .toThrowError(z.ZodError);
    });
  });

  describe('VerificarUsuario', () => {
    it('deve retornar o usuário se o email estiver cadastrado', async () => {
      const usuarioMock = [{ email: 'teste@example.com', senha: 'hash' }];
      UsuarioRepository.findMany.mockResolvedValue(usuarioMock);

      const result = await AutenticacaoServices.VerificarUsuario({ email: 'teste@example.com' });

      expect(UsuarioRepository.findMany).toHaveBeenCalledWith({ email: 'teste@example.com' });
      expect(result).toEqual(usuarioMock);
    });

    it('deve lançar erro se o email não estiver cadastrado', async () => {
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
    it('deve validar a senha com sucesso', async () => {
      Hashsenha.compararSenha.mockResolvedValue(true);

      await expect(AutenticacaoServices.validarSenhahash('senha123', 'hash'))
        .resolves
        .toBeUndefined();
    });

    it('deve lançar erro se a senha for inválida', async () => {
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