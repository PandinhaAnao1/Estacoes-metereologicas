const { z } = require('zod');

class DadosSchemas {
    static listaSchema = null;

    static listarPorIdSchema = null;

    static cadastrarSchema = z.object({
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
    ;

    static listaSchema = null;
}

module.exports = DadosSchemas;