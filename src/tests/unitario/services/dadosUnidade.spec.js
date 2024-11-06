import { jest, describe, it, expect, afterEach } from '@jest/globals';
import DadosRepository from '../../../repositories/dadosRepository.js';
import dadosService from '../../../services/dadosService.js';
import { APIErro } from '../../../util/apiErrro.js';


jest.mock('../../../repositories/dadosRepository', () => ({
    findMany: jest.fn(),
    create: jest.fn(),
}));

jest.mock('../../../repositories/dadosRepository', () => ({
    findMany: jest.fn(),
    create: jest.fn(),
}));

describe('Testes de Unidade para dadosService', () => {

    afterEach(() => {
        jest.clearAllMocks();
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

            await expect(dadosService.inserir(data)).rejects.toBeInstanceOf(APIErro);
        });


    });
});
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
            const result = await dadosService.inserir({ ...data });

            expect(DadosRepository.create).toHaveBeenCalledWith(expect.objectContaining(data));
            expect(result).toEqual(mockData);
        });



    });
});
