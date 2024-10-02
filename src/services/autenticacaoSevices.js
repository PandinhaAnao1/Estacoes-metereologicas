import UsuarioRepository from '../repositories/usuarioRepository.js'
import { z } from "zod";
import Jwt from "jsonwebtoken";
import HashSenha from '../util/hashSenha.js';
import AutenticaoSchema from '../schemas/autenticacaoSchema.js';

class AutenticacaoServices {
  // valida os campos emial e senha


  //verifica se existe um usuario com os campos passados

  static login = async (data) => {

      const {email, senha} = AutenticaoSchema.loginSchema.parse(data);;
      
      const usuario = await UsuarioRepository.findMany({email: email});

      if (usuario.length === 0) {
        throw {
          message: "Usuario não existe por favor corrija o email!",
          code: 400,
          error: true
        };
      }
      const response = await HashSenha.compararSenha(senha, usuario[0].senha)


      await this.validarSenhaHash(camposValidados.senha, usuario[0].senha)
      const token = Jwt.sign({ email, senha }, process.env.JWT_SECRET, { expiresIn: '30d' })
      return token

      // if (error instanceof z.ZodError) {
      //   const errosMessages = error.issues.map(error => error.message)
      //   throw {
      //     message: errosMessages,
      //     code: 400,
      //     error: true
      // };
      // } else {
      //   throw {
      //     message: error.message,
      //     code: 400,
      //     error: true
      // }
      // }
  }
}

export default AutenticacaoServices