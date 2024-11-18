import Jwt from "jsonwebtoken"
import { sendError, sendResponse } from "../util/messages.js";

const authentication = (req, res, next) => {
  const authHerades = req.headers.authorization
  if (!authHerades || !authHerades.startsWith('Bearer ')) {
    sendError(res, 400,[
      {
        path: 'token',
        message: 'Token não informado por favor faça login',
      }
    ]);
  } else {
    const token = authHerades.split(' ')[1]
    try {
      Jwt.verify(token, process.env.JWT_SECRET)
      next();
    } catch (error) {
      sendError(res, 401,[
        {
          path: 'token',
          message: 'Token informado não é valido por favor faça login',
        }
      ]);
    }
  }
}

export default authentication;