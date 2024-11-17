import AutenticacaoServices from "../services/autenticacaoSevices.js";
import { z } from 'zod';
import { APIErro } from "../util/apiErrro.js";
import { sendError, sendResponse } from "../util/messages.js";

class Autenticacao {

  static login = async (req, res) => {
    try {

      const response = await AutenticacaoServices.login(req.body);

      return sendResponse(res, 201, {
        data: response
      });

    } catch (error) {
      if (error instanceof APIErro) {
        const { code, errors } = error.toJson();
        return sendError(res, code, ...errors);
      }

      if (error instanceof z.ZodError) {
        let errors = [];
        error.issues.map((issue) => (
          errors.push({
            path: issue.path[0],
            message: issue.message
          })));

        return sendError(res, 400, errors);
      }

      return sendError(res, 500, []);
    }

  }
}
export default Autenticacao;