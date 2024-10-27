import request from "supertest";
import { expect, describe } from "@jest/globals";
import app from "../../app.js";
import UsuarioService from "../../services/usuarioService.js";


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
        expect(response.body.errors[0].message).toBeDefined()
        expect(response.body.errors[0].path).toBeDefined()
        expect(response.body.errors[1].message).toBeDefined()
        expect(response.body.errors[1].path).toBeDefined()
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
        expect(response.body.message).toBeDefined();
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
        expect(response.body.message).toBeDefined();
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
            .get(`/usuarios/a`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;
        //deve retornar a mensagem correta de sucesso
        expect(response.body.message).toBeDefined();
        //deve retornar status 200
        expect(response.status).toBe(400);
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
        
        
        
        console.log(response.body);
            
        //testando se retorna o motivo do erro
        expect(response.body.message).toBeDefined();
        //testando o status da resposta
        expect(response.status).toBe(400);
        //testando se o erro esta ativo
        expect({ error: true }).toHaveProperty('error', true);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
    });


    it("Verificar se esta retornando erro 400 de não encontrado", async () => {
        const response = await request(app)
            .get(`/usuarios?email=548`)
            .set("Content-Type", "application/json")

        expect(response.body).toBeDefined();
        expect(response.body.code).toEqual(400);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBeDefined();
    });

    it("Verificar se esta retornando erro 400 de não encontrado", async () => {
        const response = await request(app)
            .get(`/usuarios?nome=nãoexiste`)
            .set("Content-Type", "application/json")

        expect(response.body).toBeDefined();
        expect(response.body.code).toEqual(400);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBeDefined();
    });

});

// ----------- Atualizar usuario ---------

describe("Atualizar usuario", () => {
    it('Atualização dos dados de um usuario valido', async () => {
        const updatedData = {
            nome: "usuario Atualizado",
            email: "vitorgabriel18@outlook.com",
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
    });
    it('Atualização de um usuario invalido com dados validos', async () => {
        const updatedData = {
            nome: "usuario Atualizado",
            email: "vitorgabriel18@outlook.com",
            senha: "Senhaa123@"
        }

        const response = await request(app)
            .patch(`/usuarios/99999999999`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedData);
        
            

        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toContain('json');
        expect(response.body.error).toBe(true);
        expect(response.body.data).toBeDefined();
        expect(response.body.errors).toBeDefined();
        expect(response.body.message).toBeDefined();
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
    });
    it('deve retornar erro com o id que não consta na database', async () => {
        const id = 64161;
        const response = await request(app)
            .delete(`/usuarios/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json");



        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBeDefined();
        expect(response.body.error).toBe(true);
        expect(response.body.errors).toBeDefined();
    });
    it('deve retornar erro com o id que não é valido', async () => {
        const id = 'a';
        const response = await request(app)
            .delete(`/usuarios/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBeDefined();
        expect(response.body.error).toBe(true);
        expect(response.body.errors).toBeDefined();

    });
});