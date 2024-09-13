import AutenticacaoServices from "../services/autenticacaoSevices.js";

class Autenticacao {

  static login = async (req, res) => {
    try {
      const { email, senha } = req.body
      const data = { email, senha }
      
      const response = await AutenticacaoServices.criarToken(data)

      return res.status(201).json({
        error: false,
        code: 201,
        message: 'Token gerado com sucesso!',
        token: response,
        data: null
      })
    } catch (error) {
      return res.status(error.code || 500).json(error)
    }

  }
}
export default Autenticacao;