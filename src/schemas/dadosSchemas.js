import { string, z } from 'zod';

class DadosSchemas {
    static listar = z.object({
        temperature: z.string({
            invalid_type_error: "Temperatura informada não é do tipo string."
        }).optional(),
        humidity: z.preprocess(
            arg => (typeof arg === 'string') ? parseInt(arg) : arg,
            z.number({
                invalid_type_error: "Umidade informada não é do tipo int."
            })
        ).optional(),
        rainfall: z.preprocess(
            arg => (typeof arg === 'string') ? parseInt(arg) : arg,
            z.number({
                invalid_type_error: "Pluviosidade informada não é do tipo int."
            })
        ).optional(),
        wind_speed_kmh: z.preprocess(
            arg => (typeof arg === 'string') ? parseInt(arg) : arg,
            z.number({
                invalid_type_error: "Velocidade do vento informada não é do tipo int."
            })
        ).optional(),
        data_hora: z.preprocess(
            (arg) => {
                const date = new Date(arg);
                if (!isNaN(date.getTime())) {
                    return date;
                }
                return arg;
            },
            z.date({
                invalid_type_error: "Data informada não é do tipo date."
            })
        ).optional(),
    });;

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
                const date = new Date(arg);
                if (!isNaN(date.getTime())) {
                    return date;
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
