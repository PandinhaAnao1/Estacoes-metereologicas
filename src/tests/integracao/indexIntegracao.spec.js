import request from 'supertest';
import { expect, describe } from "@jest/globals";
import app from "../../app.js";

describe('GET / (Swagger Documentation)', () => {
    it('Deve retornar a documentação do Swagger', async () => {
        const response = await request(app)
            .get('/')
            .set('Accept', 'application/json');

        // Verifique se a resposta é 200
        expect(response.status).toBe(200);

        // Verifique se o conteúdo retornado é HTML ou JSON (dependendo de como a documentação é servida)
        expect(response.headers['content-type']).toMatch(/html|json/);

        // Verifique se o conteúdo retornado contém uma palavra chave da documentação Swagger
        expect(response.text).toContain('Swagger UI');
    });
});