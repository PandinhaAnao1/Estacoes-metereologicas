import DadosService from "../services/dadosService.js";
import { APIErro } from "../util/apiErrro.js";
import { z } from "zod";
import { sendError, sendResponse } from "../util/messages.js";
class Dados {
    static async listar(req, res) {
        try {
            const response = await DadosService.listar(req.query);
            return sendResponse(res, 200, {
                data: response,
                message: response.length > 1 ? "Dados climáticos encontrados com sucesso." : "Dado climático encontrado com sucesso.",
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
        };
    };

    static async inserir(req, res) {
        try {
            const response = await DadosService.inserir(req.body);
            return sendResponse(res, 201, {
                data: response,
                code: 201,
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

        };
    };
};

export default Dados;