import UsuarioRepository from '../repositories/usuarioRepository.js'
import { z } from "zod";
import Jwt from "jsonwebtoken";
import Hashsenha from '../util/hashSenha.js';

class AutenticacaoServices {
  // valida os campos emial e senha
  static validarCampos = async (data) => {
    try {
      const loginSchema = z.object({
        email: z.string({
          required_error: 'Campo email é obrigatório!',
          invalid_type_error: 'Formato do email invalido, deve ser string!',
        }).email({
          message: 'Email invalido!',
        }),
        senha: z.string({
          required_error: 'Campo senha é obrigatório!',
          invalid_type_error: 'Formato da senha invalido, deve ser string!'
        }).min(8, {
          message: "A senha deve possuir no minimo 8 caracteres!"
        }).refine(
          (value) =>
            /[a-z]/.test(value) &&  // Tem pelo menos uma letra minúscula
            /[A-Z]/.test(value) &&  // Tem pelo menos uma letra maiúscula
            /[0-9]/.test(value) &&  // Tem pelo menos um número
            /[^a-zA-Z0-9]/.test(value),  // Tem pelo menos um símbolo
          {
            message: "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
          }
        )
      });
      

      const loginValidated = loginSchema.required().parse(data)
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