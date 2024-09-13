import request from "supertest";
import { expect, describe } from "@jest/globals";
import app from "../../app.js";

// Apenas para teste depois irei refatorar
// ---------------- Login ----------------
let token;
let idvalido;

it('Login com autenticação jwt', async () => {
    const response = await request(app)
        .post("/autenticacao")
        .send({
            email: "carlos@example.com",
            senha: "Senha123@"
        })
        .expect(201)
    token = response.body.token;
})

// ----------- Cadastrar usuario ---------

describe("Cadastrar usuario", () => {
  it('Deve cadastrar um usuario com dados válidos', async () => {
      const response = await request(app)
          .post('/usuarios')
          .set("Authorization", `Bearer ${token}`)
          .set("Content-Type", "application/json")
          .send({
              nome: "Vitor G",
              email: `vitorgabriel18@gmail.com`,
              senha: "Senhaa123@"
          });
        expect(response.body.code).toBe(201);
        expect(response.body.message).toBe("usuario cadastrado com sucesso.");
        expect(response.body.error).toBe(false);
        idvalido = response.body.data.id
  });

  it('Deve retornar erro ao cadastrar um usuario com a senha com os parametros errados', async () => {
      const response = await request(app)
          .post('/usuarios')
          .set("Authorization", `Bearer ${token}`)
          .set("Content-Type", "application/json")
          .send({
              nome: "Vitor G",
              email: "vitorgabriel18@gmail.com",
              senha: "123"
          });

      expect(response.status).toBe(400);
      expect(response.body.message[0].message).toBe("String must contain at least 8 character(s)")
      expect(response.body.message[0].path).toBe("senha")
      expect(response.body.message[1].message).toBe("A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.")
      expect(response.body.message[1].path).toBe("senha")
      expect(response.body.error).toBe(true)
  });

  it('Deve retornar erro ao cadastrar um usuario com o email repetido', async () => {
      const response = await request(app)
          .post('/usuarios')
          .set("Authorization", `Bearer ${token}`)
          .set("Content-Type", "application/json")
          .send({
              nome: "Vitor G",
              email: "vitorgabriel18@gmail.com",
              senha: "Senhaa123@"
          });

      expect(response.status).toBe(400);
      expect({ message: "Email Já Cadastrado!" }).toHaveProperty('message', "Email Já Cadastrado!");
      expect({ error: true }).toHaveProperty('error', true);
  });
})

// ----------- Listar Estação ---------

describe("Listar usuarios", () => {

    it('Deve retornar sucesso a listagem de usuarios', async () => {
        const response = await request(app)
            .get("/usuarios")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;
        //deve retornar status 200
        expect(response.status).toBe(200);
        //deve retornar erro falso
        expect({ error: false }).toHaveProperty('error', false);
        //testando se o corpo da requisição é um array
        expect(body).toBeInstanceOf(Object);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
        expect(response.body.message).toBe("Usuários encontrados com sucesso.");
    });

    it('Deve retornar sucesso ao listar usuario com ID valido', async () => {
        const response = await request(app)
            .get(`/usuarios/${idvalido}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;
        //deve retornar a mensagem correta de sucesso
        expect(response.body.message).toBe("Usuário encontrado com sucesso");
        //deve retornar status 200
        expect(response.status).toBe(200);
        //deve retornar erro falso
        expect({ error: false }).toHaveProperty('error', false);
        //testando se o corpo da requisição é um array
        expect(body).toBeInstanceOf(Object);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
    });
    it('Deve retornar sucesso ao listar usuario com ID valido', async () => {
        const response = await request(app)
            .get(`/usuarios?id=${idvalido}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;
        //deve retornar a mensagem correta de sucesso
        expect(response.body.message).toBe("Usuário encontrado com sucesso.");
        //deve retornar status 200
        expect(response.status).toBe(200);
        //deve retornar erro falso
        expect({ error: false }).toHaveProperty('error', false);
        //testando se o corpo da requisição é um array
        expect(body).toBeInstanceOf(Object);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
    });
    it('Deve retornar sucesso ao listar usuario com ID invalido', async () => {
        const idinvalido = "9999";
        const response = await request(app)
            .get(`/usuarios/${idinvalido}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        //testando se retorna o motivo do erro
        expect(response.body.message).toBe("Usuário não encontrado.");
        //testando o status da resposta
        expect(response.status).toBe(400);
        //testando se o erro esta ativo
        expect({ error: true }).toHaveProperty('error', true);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
    });

});

// ----------- Atualizar usuario ---------

describe("Atualizar usuario", () => {
    it('Atualização dos dados de um usuario valido', async () => {
        const updatedData = {
            nome: "usuario Atualizado",
            email: "vitorgabriel18@gmail.com",
            senha: "Senhaa123@"
        }

        const response = await request(app)
            .patch(`/usuarios/${idvalido}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toContain('json');
        expect(response.body.message).toMatch("Usuario atualizado com sucesso.");
        expect(response.body.message).toMatch("Usuario atualizado com sucesso.");
        expect(response.body.data).toHaveProperty('nome', updatedData.nome);
        expect(response.body.data).toHaveProperty('email', updatedData.email);
        expect(response.body.error).toBe(false);
    })

    it('Deve retornar erro ao atualizar um usuario com a senha com os parametros errados', async () => {
        const response = await request(app)
            .patch(`/usuarios/${idvalido}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: "usuario Atualizado 2.0",
                email: "vitorgabriel18@gmail.com",
                senha: "Senhaa123"
            });

        expect(response.status).toBe(400);
        expect({ message: "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo." }).toHaveProperty('message', "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.");
        expect({ error: true }).toHaveProperty('error', true);

    });
});

// ----------- Deletar Usuário ---------

describe("Deletar usuario", () => {
  it('deve deletar usuário com id valido', async () => {
      const response = await request(app)
          .delete(`/usuarios/${idvalido}`)
          .set("Authorization", `Bearer ${token}`)
          .set("Content-Type", "application/json")
      expect(response.status).toBe(204);
  })
  it('deve retornar erro com o id invalido', async () => {
      const id = 64161;
      const response = await request(app)
          .delete(`/usuarios/${id}`)
          .set("Authorization", `Bearer ${token}`)
          .set("Content-Type", "application/json")
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.message).toBe("Usuário não encontrado.");
      expect(response.body.error).toBe(true);
  })
});