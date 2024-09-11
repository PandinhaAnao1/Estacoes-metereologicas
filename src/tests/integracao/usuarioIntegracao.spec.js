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
            email: "ana@example.com",
            senha: "Senha123@"
        })
        .expect(201)
    token = response.body.token;
})


// ----------- Listar Estação ---------

describe("Listar usuarios", () => {

    it('Deve retornar sucesso a listagem de usuarios', async () => {
        const response = await request(app)
            .get("/usuarios")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;
        idvalido = response.body.data[0].id;
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
            .get(`/usuarios/${idvalido}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;
        //deve retornar a mensagem correta de sucesso
        expect({ message: 'Usuário encontrado com sucesso' }).toHaveProperty('message', "Usuário encontrado com sucesso");
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
        expect({ message: 'Usuário não encontrado' }).toHaveProperty('message', "Usuário não encontrado");
        //testando o status da resposta
        expect(response.status).toBe(400);
        //testando se o erro esta ativo
        expect({ error: true }).toHaveProperty('error', true);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
    });
});

// ----------- Deletar Usuário ---------

describe("Deletar usuario", () => {
    it('deve deletar usuário com id valido', async () => {
        const idUser = 10;
        const response = await request(app)
            .delete(`/usuarios/${idUser}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        //testando a resposta
        expect(response.status).toBe(204);
        // //testando se o erro é falso
        expect({ error: false }).toHaveProperty('error', false);
    })
    it('deve retornar erro com o id invalido', async () => {
        const idUser = 64;
        const response = await request(app)
            .delete(`/usuarios/${idUser}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        //testando a resposta
        expect(response.status).toBe(400);
        //testando a resposta response.body é uma instancia de um objeto
        expect(response.body).toBeInstanceOf(Object);
        //testando se o erro é true
        expect({ error: true }).toHaveProperty('error', true);
        //testando a mensagem de retorno
        expect({ message: `Não existe usuário com este id: ${idUser}` }).toHaveProperty('message', `Não existe usuário com este id: ${idUser}`);
    })
});

// ----------- Cadastrar usuario ---------

describe("Cadastrar usuario", () => {
    it('Deve cadastrar um usuario com dados válidos', async () => {
        const response = await request(app)
            .post('/usuarios')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: "usuario novo2",
                email: "vitorgabriel12@gmail.com",
                senha: "Senhaa123@"
            });


        expect(response.status).toBe(201);
        expect({ message: "usuario cadastrado com sucesso!" }).toHaveProperty('message', "usuario cadastrado com sucesso!");
        expect({ error: false }).toHaveProperty('error', false);
    });

    it('Deve cadastrar um usuario com dados válidos', async () => {
        const response = await request(app)
            .post('/usuarios')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({

            });


        expect(response.status).toBe(400);
        expect(response.body).toEqual({ "code": 400, "error": true, message: [{ message: "Campo nome é obrigatório.",  path: "nome" }, 
            { message: "Campo email é obrigatório.", path: "email" }, 
            {  message: "Campo senha é obrigatório.", path: "senha" }] })
    });

    it('Deve retornar erro no email', async () => {
        const response = await request(app)
            .post('/usuarios')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: "usuario novo2",
                email: "fernanda@example.com",
                senha: "Senhaa123@"
            });


        expect(response.status).toBe(400);
        expect({ message: "Email já cadastrado." }).toHaveProperty('message', "Email já cadastrado.");
        expect({ error: true }).toHaveProperty('error', true);
    });

    it('Deve retornar erro ao cadastrar um usuario com a senha com os parametros errados', async () => {
        const response = await request(app)
            .post('/usuario')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: "usuario Atualizado 2.0",
                email: "vitorgabriel12@gmail.com",
                senha: "Senhaa123"
            });

        expect(response.status).toBe(404);
        expect({ message: "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo." }).toHaveProperty('message', "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.");
        expect({ error: true }).toHaveProperty('error', true);


    });

    it('Deve retornar erro ao cadastrar um usuario com o email repetido', async () => {
        const response = await request(app)
            .post('/usuario')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: "usuario Atualizado 2.0",
                email: "vitorgabriel123@gmail.com",
                senha: "Senhaa123@"
            });

        expect(response.status).toBe(404);
        expect({ message: "Email Já Cadastrado!" }).toHaveProperty('message', "Email Já Cadastrado!");
        expect({ error: true }).toHaveProperty('error', true);
    });
})


// ----------- Atualizar usuario ---------

describe("Atualizar usuario", () => {
    it('Atualização dos dados de um usuario valido', async () => {
        const id = 1;
        const updatedData = {
            nome: "usuario Atualizado",
            email: "vitorgabriel123@gmail.com",
            senha: "Senhaa123@"
        }

        const response = await request(app)
            .patch(`/usuarios/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toContain('json');
        expect(response.body.message).toMatch("Usuario atualizado com sucesso.");
        expect(response.body.data).toHaveProperty('nome', updatedData.nome);
        expect(response.body.data).toHaveProperty('email', updatedData.email);
        expect({ error: false }).toHaveProperty('error', false);
    })

    it('Deve retornar erro ao atualizar um usuario com a senha com os parametros errados', async () => {
        const id = 1;
        const response = await request(app)
            .patch(`/usuario/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: "usuario Atualizado 2.0",
                email: "vitorgabriel12@gmail.com",
                senha: "Senhaa123"
            });

        expect(response.status).toBe(404);
        expect({ message: "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo." }).toHaveProperty('message', "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.");
        expect({ error: true }).toHaveProperty('error', true);

    });

    it('Deve retornar erro ao atualizar um usuario com o email repetido', async () => {
        const id = 1;
        const response = await request(app)
            .patch(`/usuario/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: "usuario Atualizado 2.0",
                email: "vitorgabriel1@gmail.com",
                senha: "Senhaa123@"
            });

        expect(response.status).toBe(404);
        expect({ message: "Email Já Cadastrado!" }).toHaveProperty('message', "Email Já Cadastrado!");
        expect({ error: true }).toHaveProperty('error', true);
    });
});
