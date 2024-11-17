import request from "supertest";
import { expect, it } from "@jest/globals";
import app from "../../app.js";
import { postLogin } from "../auth.js";

describe("Testes de autenticação com token", () => {
  let req = request(app);
  let token;
  it('Deve atutenticar na aplicação!', async () => {
    const res = await postLogin(req);
    const data = res.body?.data;

    expect(data?.token).toBeTruthy();
    token = data.token;
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
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toEqual([]);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe(true);
    expect(response.body).toHaveProperty('code');
    expect(response.body.code).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0]).toHaveProperty('path');
    expect(response.body.errors[0].path).toBe('token');
    expect(response.body.errors[0]).toHaveProperty('message');
    
  });
});