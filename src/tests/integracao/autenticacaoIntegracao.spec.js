import request from "supertest";
import { expect, it } from "@jest/globals";
import app from "../../app.js";

describe("Testes de autenticação com token", () => {
  it('Criar token, deve retonar: Token gerado com sucesso!', async () => {
    const response = await request(app)
      .post('/autenticacao')
      .set("Content-Type", "application/json")
      .send({
        email: 'maria@example.com',
        senha: 'Senha123@'
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBeDefined();
    expect(typeof (response.body.token)).toBe("string");
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBe(false);
  });

  it('Deve gerar erro ao autenticar com usuario errado!', async () => {
    const response = await request(app)
      .post('/autenticacao')
      .set("Content-Type", "application/json")
      .send({
        email: 'emailErrado@example.com',
        senha: 'Senha123@'
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBeDefined();

  });

  it('Deve retornar um erro ao autenticar com uma senha errada!', async () => {
    const response = await request(app)
      .post('/autenticacao')
      .set("Content-Type", "application/json")
      .send({
        email: 'maria@example.com',
        senha: 'SenhaErrada123@'
      });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBeDefined();

  });

  it('Deve retornar um erro da validação do zod!', async () => {
    const response = await request(app)
      .post('/autenticacao')
      .set("Content-Type", "application/json")
      .send({
        email: 10,
        senha: 'SenhaErrada123@'
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBeDefined();

  });


  it('Deve retornar erro quando o token não for providenciado em uma rota protegida', async () => {
    const response = await request(app)
      .post('/estacoes')  // Substitua por uma rota que utilize o middleware de autenticação
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.Error).toBe('Token not provided');
  });
});