import { string, z } from 'zod';

class DadosSchemas {
    static listar = null;

    static listarPorId = null;

    static cadastrar = z.object({
        temperature: z.preprocess(
            arg => (typeof arg != 'string') ? String(arg) : arg,
            z.string({
                invalid_type_error: "Temperatura informada não é do tipo string."
            })
        ).nullable().optional(),
        humidity: z.number({
            invalid_type_error: "Umidade informada não é do tipo int."
        }).nullable().optional(),
        rainfall: z.number({
            invalid_type_error: "Pluviosidade informada não é do tipo int."
        }).nullable().optional(),
        wind_speed_kmh: z.number({
            invalid_type_error: "Velocidade do vento informada não é do tipo int."
        }),
        data_hora: z.preprocess(
            (arg) => {
                if (typeof arg == 'string') {
                    return new Date(arg);
                }
                return arg;
            },
            z.date({
                invalid_type_error: "Data informada não é do tipo date."
            })
        )
    });
}

export default DadosSchemas;
