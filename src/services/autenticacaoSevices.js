import UsuarioRepository from '../repositories/usuarioRepository.js'
import Jwt from "jsonwebtoken";
import HashSenha from '../util/hashSenha.js';
import AutenticaoSchema from '../schemas/autenticacaoSchema.js';
import { APIErro } from "../util/apiErrro.js";

class AutenticacaoServices {

  static login = async (data) => {

    const { email, senha } = AutenticaoSchema.loginSchema.parse(data);

    const usuario = await UsuarioRepository.findMany({ email: email });

    if (usuario.length === 0) {
      throw new APIErro(400, [
        {
          path: "email",
          message: "Usuário não existe por favor corrija o email!",
        }
      ]);
    }
    const response = await HashSenha.compararSenha(senha, usuario[0].senha);
    if (!response) {
      throw new APIErro (404, [
        {
          path: "senha",
          message: "A senha informada esta errada por favor tente"
        }
      ]);
    }

    
    const token = Jwt.sign({ ...usuario[0]}, process.env.JWT_SECRET, { expiresIn: '30d' });
    usuario.forEach((e) => delete e.senha);
    return {
        token: token,
        ...usuario[0]
    }
  }
}

export default AutenticacaoServices;