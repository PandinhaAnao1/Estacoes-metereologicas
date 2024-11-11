import env from "dotenv";
import EstacaoService from "../services/estacaoService.js";
import { sendError, sendResponse } from "../util/messages.js";
import { z } from 'zod';
import { APIErro } from "../util/apiErrro.js";

env.config();

class Estacao {
  static listar = async (req, res) => {
    try {
      const response = await EstacaoService.listar(req.query);
      res.status(200).json({
        data: response,
        error: false,
        code: 200,
        message: response.length > 1 ? "Estações encontradas com sucesso." : "Estação encontrada com sucesso.",
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
          })
        ));
        return sendError(res, 400, errors);
      }

      sendError(res, 500, []);
    };
  };

  // GET por ID - listar Usuario por ID 
  static listarPorId = async (req, res) => {
    try {
      const id = Number(req.params.id);

      const response = await EstacaoService.listarPorID({ id });
      return sendResponse(res, 200, {
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
          })
        ));
        return sendError(res, 400, errors);
      }

      sendError(res, 500, []);
    }
  };



  static atualizar = async (req, res) => {
    try {
      const id = { id: req.params.id };
      const { nome, endereco, latitude, longitude, ip, status, usuario_id } = req.body;
      const data = {
        nome: nome,
        endereco: endereco,
        latitude: latitude,
        longitude: longitude,
        ip: ip,
        status: status,
        usuario_id: usuario_id,
      };
      const response = await EstacaoService.atualizar(id, data);
      res.status(200).json({
        data: response,
        error: false,
        code: 200,
        message: "Estação atualizada com sucesso.",
      });
    } catch (error) {
      return res.status(error.code || 500).json(error);
    };
  };

  static cadastrar = async (req, res) => {
    try {
      const response = await EstacaoService.inserir(req.body);
      return sendResponse(res, 201, {
        data: response,

      });

    } catch (error) {
      if (error.code && error.error) {
        return sendError(res, error.code, [error.error]);
      }
      if (error instanceof z.ZodError) {
        let errors = [];
        error.issues.map((issue) => {
          errors.push(
            {
              path: issue.path[0],
              message: issue.message
            }
          );
        });
        return sendError(res, 400, errors);

      }
      return sendError(res, 500, []);
    };
  };

};

export default Estacao;