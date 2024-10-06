import AutenticacaoServices from "../services/autenticacaoSevices.js";
import {z} from 'zod';
class Autenticacao {

  static login = async (req, res) => {
    try {

      const response = await AutenticacaoServices.login(req.body);

      return res.status(201).json({
        error: false,
        code: 201,
        message: 'Token gerado com sucesso!',
        ...response
      })
    } catch (error) {
      if(error.code && error.message){
        return res.status(error.code).json({
         ...error
        })
      }
      
      if (error instanceof z.ZodError) {
         const errosMessages = error.issues.map(error => error.message);
         return res.status(400).json({
           message: errosMessages,
           code: 400,
           error: true
       });
       }
      return res.status(error.code || 500).json(error)
    }

  }
}
export default Autenticacao;