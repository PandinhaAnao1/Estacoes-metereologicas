import request from "supertest";
import { expect, describe } from "@jest/globals";
import app from "../../app.js";
import DadosRepository from '../../repositories/dadosRepository.js';



describe('Testes de integração para as rotas /dados', () => {
    describe('GET /dados', () => {
        it('Deve retornar dados climáticos', async () => {
            const response = await request(app)
                .get('/dados')
            expect(response.body.error).toBe(false);
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.code).toBe(200);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Dados climáticos encontrados com sucesso.");
        });

        it('Deve retornar dados climáticos filtrados', async () => {
            const response = await request(app)
                .get('/dados')
                .query({ temperature: '25.3' })

            expect(response.body.error).toBe(false);
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data[0].temperature).toBe('25.3');
            expect(response.body.code).toBe(200);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Dado climático encontrado com sucesso.");
        });

        it('Deve retornar erro 400 quando não encontrar dados climáticos', async () => {
            const response = await request(app)
                .get('/dados')
                .query({ temperature: '25000' }) //temperatura que não existe
            expect(response.body.error).toBe(true);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Nenhum dado climático encontrado");
        });


        it('Deve filtrar dados climáticos usando humidity, rainfall, wind_speed_kmh e data_hora', async () => {
            
            await request(app)
                .get('/dados')
                .query({
                    temperature: '25.3',
                    humidity: '60', 
                    rainfall: '5', 
                    wind_speed_kmh: '12'
                })
                .expect(200)
                .then((res) => {

                    expect(res.body.error).toBe(false);
                    // expect(res.body.data).toBe('fndks')
                    expect(res.body.data[0]).toHaveProperty('humidity');
                    expect(res.body.data[0]).toHaveProperty('rainfall');
                    expect(res.body.data[0]).toHaveProperty('temperature');
                    expect(res.body.data[0]).toHaveProperty('wind_speed_kmh');

                });

        });

    });

    describe('POST /dados', () => {
        it('Deve inserir dados climáticos e retornar sucesso', async () => {
            const response = await request(app)
                .post('/dados')
                .send({
                    temperature: '25',
                    humidity: 80,
                    rainfall: 10,
                    wind_speed_kmh: 20
                })
            expect(response.body.error).toBe(false);
            expect(response.body.data).toHaveProperty('temperature');
            expect(response.body.data).toHaveProperty('humidity');
            expect(response.body.data).toHaveProperty('rainfall');
            expect(response.body.data).toHaveProperty('wind_speed_kmh');
            expect(response.body.data).toHaveProperty('data_hora');
            expect(response.status).toBe(201);
        });

        it('Deve retornar erro 400 ao tentar inserir dados inválidos', async () => {
            const invalidData = {
                temperature: 25, // Deveria ser string
                humidity: '80',  // Deveria ser número
                rainfall: 10,
                wind_speed_kmh: '20' // Deveria ser número
            };

            await request(app)
                .post('/dados')
                .send(invalidData)
                .expect(400)
                .then((res) => {
                    expect(res.body.error).toBe(true);
                    expect(res.body.message).toEqual(expect.arrayContaining([
                        { path: 'temperature', message: "Temperatura informada não é do tipo string." },
                        { path: 'humidity', message: "Umidade informada não é do tipo int." },
                        { path: 'wind_speed_kmh', message: "Velocidade do vento informada não é do tipo int." },
                    ]));
                });
        });

    });
});
