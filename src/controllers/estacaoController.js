import bcrypt from "bcryptjs";
import env from "dotenv";
import { prisma } from "../configs/prismaClient.js";


env.config();

class Estacao {

  static listar = async (req, res) => {
    try {
      const response = await prisma.estacao.findMany()
      res.status(200).json({ response: response })
    } catch (error) {
      res.status(400).json({
        error: true,
        code: 400,
        message: error.message
      }
      )
    }
  }
  // GET por ID - listar Usuario por ID 
  static listarPorID = async (req, res) => {
    try {
      const estacao = await prisma.estacao.findFirst({
        //filtro
        where: {
          id: parseInt(req.params.id),
        },
        select: {
          id: true,
          nome: true,
          endereco: true,
          latitude: true,
          longitude: true,
          ip: true,
          status: true,
          usuario_id: true,
        }
      }
      );
      if (!estacao) {
        throw new Error("Estação não encontrada");
      }
      res.status(200).json([{
        message: "Estação encontrada com sucesso",
        code: 200,
        error: false,
        data: estacao
      }])
    } catch (err) {
      console.error(err);
      res.status(400).json([{
        message: err.message,
        code: 400,
        error: true
      }])
    }
  }

  static editarEstacao = async (req, res) => {
    try {
      const { id } = req.params;
      const intId = parseInt(id)
      const estacaoById = await prisma.estacao.findUnique({
        where: {
          id: intId
        }
      });
      if (!estacaoById) {
        return res.status(400).json({
          message: "Estação não encontrada.",
          code: 400,
          error: true,
        });
      }
      for (const value in req.body) {
        if (!req.body[value]) {
          return res.status(400).json({
            message: `Campo ${value} não específicado.`,
            code: 400,
            error: true,
          });
        }
      }
      const estacaoAtualizada = await prisma.estacao.update({
        where: {
          id: intId
        },
        data: {
          nome: req.body.nome,
          endereco: req.body.endereco,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          ip: req.body.ip,
          status: req.body.status,
          usuario_id: req.body.usuario_id,
          dados_diarios: req.body.dados_diarios,
          usuario: req.body.usuario,
        }
      });
      res.status(200).json({
        message: "Estação atualizada com sucesso.",
        error: false,
        code: 200,
        data: estacaoAtualizada,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        code: 400,
        error: true,
      });
    }

  }

  static cadastrarEstacao = async (req, res) => {
    try {
      const { nome, endereco, latitude, longitude, ip, status, usuario_id } = req.body;
      const erros = [];

      if (!nome) {
        erros.push({ error: true, code: 400, message: "Nome não informado" });
      }
      if (!endereco) {
        erros.push({ error: true, code: 400, message: "Endereço não informado" });
      }
      if (!latitude) {
        erros.push({ error: true, code: 400, message: "Latitude não informada" });
      }
      if (!longitude) {
        erros.push({ error: true, code: 400, message: "Longitude não informada" });
      }
      if (!ip) {
        erros.push({ error: true, code: 400, message: "IP não informado" });
      }
      if (!status) {
        erros.push({ error: true, code: 400, message: "Status não informado" });
      }
      if (!usuario_id) {
        erros.push({ error: true, code: 400, message: "ID do usuário não informado" });
      }

      if (erros.length > 0) {
        return res.status(400).json({
          message: erros,
          code: 400,
          error: true,
        });
      }

      // Verificar se o usuário existe
      const user = await prisma.usuario.findFirst({
        where: {
          id: usuario_id,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "Usuário não encontrado",
          code: 404,
          error: true,
        });
      }

      // Verificar se o nome da estação já está cadastrado
      const stationNameExists = await prisma.estacao.findFirst({
        where: {
          nome: {
            equals: req.body.nome,
          }
        },
      });

      if (stationNameExists) {
        return res.status(400).json({ error: true, code: 400, message: "Nome já cadastrado" });
      }
      const inserir = await prisma.estacao.create({
        data: {
          nome: nome,
          endereco: endereco,
          latitude: latitude,
          longitude: longitude,
          ip: ip,
          status: status,
          usuario_id: usuario_id
        }
      });

      return res.status(201).json({
        data: inserir,
        message: 'estação cadastrada com sucesso!',
        code: 201,
        error: false
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: error.message,
        code: 400,
        error: true,
      });
    }
  };
}
export default Estacao;