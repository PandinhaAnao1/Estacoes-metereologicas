import UsuarioRepository from '../repositories/usuarioRepository.js'
import { z } from "zod";
import Jwt from "jsonwebtoken";
import Hashsenha from '../util/hashSenha.js';
import AutenticaoSchema from '../schemas/autenticacaoSchema.js';

class AutenticacaoServices {
  // valida os campos emial e senha
  static validarCampos = async (data) => {
    try {
    
      
      const loginValidated = AutenticaoSchema.loginSchema.required().parse(data)
      return loginValidated
    } catch (error) {
      throw error
    }
  }

  //verifica se existe um usuario com os campos passados
  static VerificarUsuario = async (data) => {
    try {
      const usuario = await UsuarioRepository.findMany({email: data.email})

      if (usuario.length === 0) {
        throw {
          message: "Email Não cadastrado!",
          code: 400,
          error: true
      };
      }
      return usuario
    } catch (error) {
      throw error
    }
  }

  static validarSenhahash = async (senha, hash)=>{
    const response = await Hashsenha.compararSenha(senha, hash)
    if(!response){
      throw {
        message: "Senha Invalida!",
        code: 400,
        error: true
    };
    }
  }

  static criarToken = async (data) => {
    try {
      const camposValidados = await this.validarCampos(data)
      
      const usuario = await this.VerificarUsuario(camposValidados)

      await this.validarSenhahash(camposValidados.senha, usuario[0].senha)
      const { email, senha } = usuario
      const token = Jwt.sign({ email, senha }, process.env.JWT_SECRET, { expiresIn: '30d' })
      return token
    } catch (error) {

      if (error instanceof z.ZodError) {
        const errosMessages = error.issues.map(error => error.message)
        throw {
          message: errosMessages,
          code: 400,
          error: true
      };
      } else {
        throw {
          message: error.message,
          code: 400,
          error: true
      }
      }
    }
  }
}

export default AutenticacaoServices