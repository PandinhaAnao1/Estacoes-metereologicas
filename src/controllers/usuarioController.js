import UsuarioService from "../services/usuarioService.js";
import { z } from "zod";
import {sendError} from "../util/messages.js"

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

      return res.status(error.code || 500).json(error);
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
      return res.status(error.code || 500).json({
        error: false,
        code: error.code || 500,
        message: error.message,
      });
    };
  };

  static deletar = async (req, res) => {
    try {
      const id = { id: req.params.idUser };
      await UsuarioService.deletar(id);
      return res.status(204).json({
        error: false,
        code: 204,
        message: "Usuario deletado com sucesso.",
      });
    } catch (error) {
      return res.status(error.code || 500).json(error);
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
      
      if(error.code && error.message){
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
        return res.status(400).json( {
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
      const id = { id: req.params.id };
      const response = await UsuarioService.listarPorID(id);
      res.status(200).json({
        data: response,
        error: false,
        code: 200,
        message: "Usuário encontrado com sucesso",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
          const errorMessages = error.issues.map((issue) => ({
                  path: issue.path[0],
                  message: issue.message
          }));
          
          return res.status(400).json({
          error: true,
          code: 400,
          message: errorMessages,
        })
  }   else {
          return res.status(error.code || 500).json({
            error: true,
            code: error.code || 500,
            message: error.message || "Erro interno no servidor!",
        })
      }
    };
  };
}

export default Usuario;


