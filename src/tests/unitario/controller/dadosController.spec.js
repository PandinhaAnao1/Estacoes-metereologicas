import request from 'supertest';
import app from '../../../app.js';
import DadosService from '../../../services/dadosService.js';
import { APIErro } from '../../../util/apiErrro.js';

jest.mock('../../../services/dadosService.js');


describe('Teste de unidade para o controller de dados', () => {
    describe('POST', () => {
        it('Deve retornar erro de APIErro corretamente', async () => {
            const mockError = new APIErro(400, [{ path: 'temperature', message: 'Temperatura inválida' }]);
            DadosService.inserir.mockRejectedValue(mockError);

            const response = await request(app)
                .post('/dados')
                .send({ temperature: 'invalid' });


            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(DadosService.inserir).toHaveBeenCalled();
            expect(response.body.data).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.error).toEqual(true);
        });

        it('Deve retornar erro 500 para erros desconhecidos', async () => {
            DadosService.inserir.mockRejectedValue(new Error('Erro desconhecido'));

            const response = await request(app)
                .post('/dados')
                .send({ temperature: '25' });

            expect(DadosService.inserir).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(response.body.errors).toEqual([]);
            expect(response.body.data).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.error).toEqual(true);
        });
    });
    describe('GET', () => {


        it('Deve retornar erro 500 para erros desconhecidos', async () => {
            DadosService.listar.mockRejectedValue(new Error('Erro desconhecido'));

            const response = await request(app)
                .get('/dados')
                .send({ temperature: '25' });

            expect(DadosService.listar).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(response.body.errors).toEqual([]);
            expect(response.body.data).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.error).toEqual(true);
        });
    });
});