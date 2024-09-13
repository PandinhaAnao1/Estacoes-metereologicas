import { jest, describe, it, expect, afterEach } from '@jest/globals';
import DadosRepository from '../../repositories/dadosRepository.js';
import dadosService from '../../services/dadosService.js';

jest.mock('../../repositories/dadosRepository.js', () => ({
    findMany: jest.fn(),
    create: jest.fn(),
}));

describe('Testes de Unidade para dadosService', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Testes de Unidade para dadosService.listar
    describe('dadosService.listar', () => {
        it('Deve retornar dados filtrados corretamente', async () => {
            const mockDados = [
                { temperature: '25', humidity: 80, rainfall: 10, wind_speed_kmh: 20, data_hora: new Date() },
            ];
            DadosRepository.findMany.mockResolvedValue(mockDados);

            const filtro = { temperature: '25' };
            const result = await dadosService.listar(filtro);

            expect(DadosRepository.findMany).toHaveBeenCalledWith(filtro);
            expect(result).toEqual(mockDados);
        });

        it('Deve lançar erro se nenhum dado for encontrado', async () => {
            DadosRepository.findMany.mockResolvedValue([]);

            const filtro = { temperature: '25' };

            await expect(dadosService.listar(filtro)).rejects.toEqual({
                error: true,
                code: 400,
                message: "Nenhum dado climático encontrado",
            });
        });

        it('Deve lançar erro de validação para filtro inválido', async () => {
            const filtroInvalido = { wind_speed_kmh: 'vinte' }; // Deve ser número, mas é string

            await expect(dadosService.listar(filtroInvalido)).rejects.toEqual({
                error: true,
                code: 400,
                message: [
                    {
                        path: "wind_speed_kmh",
                        message: "Velocidade do vento informada não é do tipo int."
                    }
                ],
            });
        });
    });

    // Testes de Unidade para dadosService.inserir
    describe('dadosService.inserir', () => {
        it('Deve inserir dados corretamente e retornar o registro criado', async () => {
            const mockData = { 
                temperature: '25', 
                humidity: 80, 
                rainfall: 10, 
                wind_speed_kmh: 20, 
                data_hora: `${new Date()}`
            };
            DadosRepository.create.mockResolvedValue(mockData);

            const data = {
                temperature: '25',
                humidity: 80,
                rainfall: 10,
                wind_speed_kmh: 20,
                data_hora: new Date()
            };
            const result = await dadosService.inserir(data);

            expect(DadosRepository.create).toHaveBeenCalledWith(expect.objectContaining(data));
            expect(result).toEqual(mockData);
        });

        it('Deve lançar erro se os dados não forem salvos no banco', async () => {
            DadosRepository.create.mockResolvedValue(null);

            const data = {
                temperature: '25',
                humidity: 80,
                rainfall: 10,
                wind_speed_kmh: 20,
                data_hora: new Date()
            };

            await expect(dadosService.inserir(data)).rejects.toEqual({
                error: true,
                code: 400,
                message: "Não foi possível inserir os dados climáticos no banco de dados.",
            });
        });

        it('Deve lançar erro de validação para dados inválidos', async () => {
            const dadosInvalidos = {
                temperature: 25, // Deve ser string, mas é número
                wind_speed_kmh: 'vinte', // Deve ser número, mas é string
                data_hora: new Date()

            };

            await expect(dadosService.inserir(dadosInvalidos)).rejects.toEqual({
                error: true,
                code: 400,
                message: [
                    {
                        path: "temperature",
                        message: "Temperatura informada não é do tipo string."
                    },
                    {
                        path: "wind_speed_kmh",
                        message: "Velocidade do vento informada não é do tipo int."
                    }
                ],
            });
        });
    });
});
