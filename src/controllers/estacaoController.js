import env from "dotenv";
import EstacaoService from "../services/estacaoService.js";
import { sendError } from "../util/messages.js";


env.config();

class Estacao {
  static listar = async (req, res) => {
    try {
      const { id, nome, endereco, latitude, longitude, ip, status, usuario_id } = req.query;
      const filtro = {
        id: id,
        nome: nome,
        endereco: endereco,
        latitude: latitude,
        longitude: longitude,
        ip: ip,
        status: status,
        usuario_id: usuario_id
      };
      const response = await EstacaoService.listar(filtro);
      res.status(200).json({
        data: response,
        error: false,
        code: 200,
        message: response.length > 1 ? "Estações encontradas com sucesso." : "Estação encontrada com sucesso.",
      });
    } catch (error) {
      return res.status(error.code || 500).json(error);
    };
  };

  // GET por ID - listar Usuario por ID 
  static listarPorId = async (req, res) => {
    try {
      const id = { id: req.params.id };
      const response = await EstacaoService.listarPorID(id)
      res.status(200).json({
        data: response,
        error: false,
        code: 200,
        message: "Estação encontrada com sucesso"
      })
    } catch (error) {
      return res.status(error.code || 500).json(error);
    }
  }

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
      return res.status(201).json({
        data: response,
        error: false,
        code: 201,
        message: 'Estação cadastrada com sucesso.'
      });
    } catch (error) {
      if(error.code && error.error){
        return sendError(res,error.code, [error.error]);
      }
      if (error instanceof z.ZodError) {
        let errors = [];
        error.issues.map((issue) => {
          errors.add(
            {
              path: issue.path[0],
              message: issue.message
            }
          );
        });
        return sendError(res,400,errors);
        
      }
      return res.status(error.code || 500).json(error);
    };
  };

};

export default Estacao;