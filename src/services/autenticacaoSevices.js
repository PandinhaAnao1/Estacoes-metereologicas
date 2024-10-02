import UsuarioRepository from '../repositories/usuarioRepository.js'
import Jwt from "jsonwebtoken";
import HashSenha from '../util/hashSenha.js';
import AutenticaoSchema from '../schemas/autenticacaoSchema.js';

class AutenticacaoServices {

  static login = async (data) => {

    const { email, senha } = AutenticaoSchema.loginSchema.parse(data);;

    const usuario = await UsuarioRepository.findMany({ email: email });

    if (usuario.length === 0) {
      throw {
        message: "Usuario não existe por favor corrija o email!",
        code: 400,
        error: true
      };
    }
    const response = await HashSenha.compararSenha(senha, usuario[0].senha);
    if (!response) {
      throw {
        data: [],
        error: true,
        code: 404,
        mensage: "A senha informada esta errada por favor tente"
      }
    }

    const { id, nome, ...resto } = usuario[0];

    const token = Jwt.sign({ email, senha }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return {
      tonken: token,
      data: {
        id,
        nome,
        email: usuario[0].email
      }
    }
  }
}

export default AutenticacaoServices;