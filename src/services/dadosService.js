import dadosRepository from "../repositories/dadosRepository.js"
import { z } from "zod";

class dadosService {
    static async listar(filtro) {
        console.log(filtro)
        try {
            const filtroSchema = z.object({
                temperature: z.string({
                    invalid_type_error: "Temperatura informada não é do tipo string."
                }).optional(),
                humidity: z.number({
                    invalid_type_error: "Umidade informada não é do tipo int."
                }).optional(),
                rainfall: z.number({
                    invalid_type_error: "Pluviosidade informada não é do tipo int."
                }).optional(),
                wind_speed_kmh: z.number({
                    invalid_type_error: "Velocidade do vento informada não é do tipo int."
                }).optional(),
                data_hora: z.date({
                    invalid_type_error: "Data informada não é do tipo string/data"
                }).optional(),
            });
            const filtroValidated = filtroSchema.parse(filtro)
            const response = await dadosRepository.findMany(filtroValidated)
            if (response.length === 0) throw {
                error: true,
                code: 400,
                message: "Nenhum dado climático encontrado",
            };
            return response;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path[0],
                        message: issue.message
                    };
                });
                throw {
                    error: true,
                    code: 400,
                    message: errorMessages,
                };
            } else {
                throw error;
            };
        };
    };
    static async inserir(data) {
        try {
            const dadosSchema = z.object({
                temperature: z.string({
                    invalid_type_error: "Temperatura informada não é do tipo string."
                }).nullable().optional(),
                humidity: z.number({
                    invalid_type_error: "Umidade informada não é do tipo int."
                }).nullable().optional(),
                rainfall: z.number({
                    invalid_type_error: "Pluviosidade informada não é do tipo int."
                }).nullable().optional(),
                wind_speed_kmh: z.number({
                    invalid_type_error: "Velocidade do vento informada não é do tipo int."
                }),
                data_hora: z.date({
                    invalid_type_error: "Data informada não é do tipo date."
                })
            });
            const dadosValidated = dadosSchema.parse(data);
            const response = await dadosRepository.create(dadosValidated);
            if (!response) throw {
                error: true,
                code: 400,
                message: "Não foi possível inserir os dados climáticos no banco de dados.",
            }
            return response;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path[0],
                        message: issue.message
                    };
                });
                throw {
                    error: true,
                    code: 400,
                    message: errorMessages,
                };
            } else {
                throw error;
            };
        }
    }
}

export default dadosService