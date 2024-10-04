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
    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Token gerado com sucesso!')
    expect(typeof (response.body.token)).toBe("string")
    expect(response.body.data).toBeDefined()
    expect(response.body.error).toBe(false)
  });

  it('Deve retornar erro quando um usuario que não exite for informado', async () => {
    const response = await request(app)
      .post('/autenticacao')
      .set("Content-Type", "application/json")
      .send({
        email: 'EMAIL QUE NAO EXITE@gmail.com',
        senha: 'Senha123@'
      });
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
  });

  it('Deve retornar erro quando um usuario que exite informar a senha errada!', async () => {
    const response = await request(app)
      .post('/autenticacao')
      .set("Content-Type", "application/json")
      .send({
        email: 'maria@example.com',
        senha: 'senhaErrada'
      });
    console.log(response.body);
    expect(response.status).toBe(400)
    expect(response.body.error).toBe(true)
  });


  it('Deve retornar erro quando o token não for providenciado em uma rota protegida', async () => {
    const response = await request(app)
      .post('/estacoes')  // Substitua por uma rota que utilize o middleware de autenticação
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.Error).toBe('Token not provided');
  });
});