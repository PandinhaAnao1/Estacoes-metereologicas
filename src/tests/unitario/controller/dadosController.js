import request from 'supertest';
import express from 'express';
import DadosController from '../../../controllers/dadosController.js';
import DadosService from '../../../services/dadosService.js';
import { APIErro } from '../../../util/apiErrro.js';
import { z } from 'zod';

jest.mock('../../../services/dadosService.js');

const app = express();
app.use(express.json());
app.post('/dados', DadosController.inserir);

describe('DadosController.inserir', () => {
    it('Deve inserir dados corretamente e retornar o registro criado', async () => {
        const mockData = {
            temperature: '25',
            humidity: 80,
            rainfall: 10,
            wind_speed_kmh: 20,
            data_hora: new Date()
        };
        DadosService.inserir.mockResolvedValue(mockData);

        const response = await request(app)
            .post('/dados')
            .send(mockData);

        expect(response.status).toBe(201);
        expect(response.body.data).toEqual(mockData);
        expect(response.body.code).toBe(201);
    });

    it('Deve retornar erro de APIErro corretamente', async () => {
        const mockError = new APIErro(400, [{ path: 'temperature', message: 'Temperatura inválida' }]);
        DadosService.inserir.mockRejectedValue(mockError);

        const response = await request(app)
            .post('/dados')
            .send({ temperature: 'invalid' });

        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual([{ path: 'temperature', message: 'Temperatura inválida' }]);
    });

    it('Deve retornar erro de validação ZodError corretamente', async () => {
        const mockError = new z.ZodError([
            { path: ['temperature'], message: 'Temperatura deve ser string' }
        ]);
        DadosService.inserir.mockRejectedValue(mockError);

        const response = await request(app)
            .post('/dados')
            .send({ temperature: 25 });

        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual([{ path: 'temperature', message: 'Temperatura deve ser string' }]);
    });

    it('Deve retornar erro 500 para erros desconhecidos', async () => {
        DadosService.inserir.mockRejectedValue(new Error('Erro desconhecido'));

        const response = await request(app)
            .post('/dados')
            .send({ temperature: '25' });

        expect(response.status).toBe(500);
        expect(response.body.errors).toEqual([]);
    });
});