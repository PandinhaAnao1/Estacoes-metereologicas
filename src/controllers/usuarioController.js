import UsuarioService from "../services/usuarioService.js";
import { z } from "zod";
import { sendError, sendResponse } from "../util/messages.js"

class Usuario {
  static cadastrar = async (req, res) => {
    try {
      const { nome, email, senha } = req.body;
      const response = await UsuarioService.inserir({ nome, email, senha });
      return res.status(201).json({
        data: response,
        error: false,
        code: 201,
        message: 'usuario cadastrado com sucesso.',
      });
    } catch (error) {
      
      if (error.code && error.errors) {
        return sendError(res, error.code, error.errors)
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

      return sendError(res,500,[]);
      
    };
  };

  static atualizar = async (req, res) => {
    try {
      const id = { id: req.params.id };
      const { nome, email, senha } = req.body;
      const data = { nome, email, senha };
      const response = await UsuarioService.atualizar(id, data);
      return res.status(200).json({
        data: response,
        error: false,
        code: 200,
        message: "Usuario atualizado com sucesso.",
      });
    } catch (error) {
      
      if (error.code && error.errors) {
        return sendError(res, error.code, error.errors)
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

      return sendError(res,500,[]);

    };
  };

  static deletar = async (req, res) => {
    try {

      const response = await UsuarioService.deletar(req.params);

      return sendResponse(res, 204);

    } catch (error) {

      if (error.code && error.errorDetail) {
        const { code, errorDetail } = error;
        return sendError(res, code, [errorDetail]);
      }
      if (error instanceof z.ZodError) {
        let erros = [];
        error.issues.map((issue) => {
          erros.push({
            path: issue.path[0],
            message: issue.message
          });
        });
        return sendError(res, 400, erros);
      }
      return sendError(res, 500);
    };
  };

  static listar = async (req, res) => {
    try {
      const { id, nome, email } = req.query;
      const filtro = {
        id: id,
        nome: nome,
        email: email
      };
      const response = await UsuarioService.listar(filtro);
      return res.status(200).json({
        data: response,
        error: false,
        code: 200,
        message: response.length > 1 ? "Usuários encontrados com sucesso." : "Usuário encontrado com sucesso.",
      });
    } catch (error) {
      if (error.code && error.message) {
        return res.status(error.code).json({
          ...error
        })
      }

      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((issue) => {
          return {
            path: issue.path[0],
            message: issue.message
          }
        });
        return res.status(400).json({
          error: true,
          code: 400,
          message: errorMessages,
        });
      }
      return res.status(error.code || 500).json(error);
    };
  };

  static listarPorId = async (req, res) => {
    try {
      const response = await UsuarioService.listarPorID(req.params);
      return sendResponse(res, 200, {
        data: response
      });
      
    } catch (error) {

      if (error.code && error.message) {
        return sendError(res, error.code, [])
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

      return sendError(res,500,[]);
    }
    

  };
};


export default Usuario;


