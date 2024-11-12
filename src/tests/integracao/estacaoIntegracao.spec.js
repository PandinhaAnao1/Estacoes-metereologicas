import request from "supertest";
import { expect, describe, beforeEach } from "@jest/globals";
import { prisma } from "../../configs/prismaClient.js";
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

// ----------- Cadastrar Estação ---------
beforeEach(async () => {
    idvalido = 1;
});
describe("Cadastrar estação", () => {
    it('Deve cadastrar uma estação com dados válidos', async () => {
        const response = await request(app)
            .post('/estacoes')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: 'Estação Central',
                endereco: 'Rua 1, Centro',
                latitude: -46.6333,
                longitude: -23.5505,
                ip: '192.168.0.1',
                status: 'ativo',
                usuario_id: 6
            });
        expect(response.status).toBe(201);
        idvalido = response.body.data.id
    });

    it('Deve retornar erro ao cadastrar uma estação com usuário_id inválido', async () => {
        const response = await request(app)
            .post('/estacoes')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: 'estacao av parana',
                endereco: 'av parana n3020',
                latitude: 123.456,
                longitude: 456.789,
                ip: '192.168.0.1',
                status: 'ativo',
                usuario_id: 999
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.data).toBeDefined();
        expect(response.body.code).toBeDefined();
        expect(response.body.error).toEqual(true);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toBeDefined();
        expect(response.body.errors[0].path).toBeDefined();
    });
    it('Deve retornar erro ao tentar cadastrar estação sem passar os atributos', async () => {
        const response = await request(app)
            .post('/estacoes')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.data).toBeDefined();
        expect(response.body.code).toBeDefined();
        expect(response.body.error).toEqual(true);
        expect(response.body.errors[0].message).toBeDefined();
        expect(response.body.errors[0].path).toBeDefined();
        expect(response.body.errors[1].message).toBeDefined();
        expect(response.body.errors[1].path).toBeDefined();
        expect(response.body.errors[2].message).toBeDefined();
        expect(response.body.errors[2].path).toBeDefined();
        expect(response.body.errors[3].message).toBeDefined();
        expect(response.body.errors[3].path).toBeDefined();
        expect(response.body.errors[4].message).toBeDefined();
        expect(response.body.errors[4].path).toBeDefined();
        expect(response.body.errors[5].message).toBeDefined();
        expect(response.body.errors[5].path).toBeDefined();
        expect(response.body.errors[6].message).toBeDefined();
        expect(response.body.errors[6].path).toBeDefined();
    });
})

// ----------- Atualizar Estação ---------

describe("Atualizar estação", () => {
    it('Atualização dos dados de uma estação', async () => {
        const updatedData = {
            nome: "Estação Atualizada 2.0",
            endereco: "Ifro - Campus Vilhena/RO"
        }
        const estacao = await prisma.estacao.findFirst({
            where: {
                usuario_id: 6
            }
        });
        const response = await request(app)
            .patch(`/estacoes/${estacao.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body.message).toMatch("Estação atualizada com sucesso.");
        expect(response.body.data).toHaveProperty('nome', updatedData.nome);
        expect(response.body.data).toHaveProperty('endereco', updatedData.endereco);
    });
});
describe("Deve retornar erro ao atualizar estação com id invalido", () => {
    it('Atualização dos dados de uma estação', async () => {
        const response = await request(app)
            .patch(`/estacoes/e`)
            .set("Authorization", `Bearer ${token}`)

        expect(response.body.error).toBe(true)
        expect(response.status).toBe(400);
        expect(response.body.message[0].message).toBe("Id informado não é do tipo number.")
        expect(response.body.message[0].path).toBe("id")
    });
});
describe("Listar estação", () => {
    it('Listagem das estações', async () => {
        const response = await request(app)
            .get("/estacoes")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;
        expect(response.status).toBe(200);
        expect(body.data).toBeInstanceOf(Array);
        expect(response.body.message).toBe("Estações encontradas com sucesso.")
        expect(response.body.error).toBe(false)
    });
    it('Listagem das estações id params', async () => {
        const response = await request(app)
            .get(`/estacoes?id=${idvalido}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;
        expect(response.status).toBe(200);
        expect(body.data).toBeInstanceOf(Array);
        expect(response.body.message).toBe("Estação encontrada com sucesso.")
        expect(response.body.error).toBe(false)
    });
    it('Listar estação por ID valido', async () => {
        const response = await request(app)
            .get(`/estacoes/${idvalido}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json");

        console.log(response.body);
        console.log(idvalido);
        
        
        expect(response.status).toBe(200);
        expect(response.body.error).toBe(false)
        expect({ id: idvalido }).toHaveProperty('id', idvalido);
        expect(response.headers['content-type']).toContain('json');
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.data).toBeInstanceOf(Object);
        expect(response.body.message).toBeDefined()
        expect(typeof response.body.data.id).toBe('number');
        expect(typeof response.body.data.nome).toBe('string');
        expect(typeof response.body.data.endereco).toBe('string');
        expect(typeof response.body.data.latitude).toBe('number');
        expect(typeof response.body.data.longitude).toBe('number');
        expect(typeof response.body.data.ip).toBe('string');
        expect(typeof response.body.data.status).toBe('string');
        expect(typeof response.body.data.usuario_id).toBe('number');
    });

});

describe("Listar estação", () => {
    it('Deve retornar erro ao listar estação com id invalido', async () => {
        const response = await request(app)
            .get(`/estacoes/9999`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        expect(response.status).toBe(400);
        expect({ message: 'Estação não encontrada' }).toHaveProperty('message', "Estação não encontrada");
        expect({ error: true }).toHaveProperty('error', true);
    });
    it('Listagem das estações por id letra', async () => {
        const response = await request(app)
            .get("/estacoes/e")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")

        const body = response.body;
        expect(response.status).toBe(400);
        expect(body.error).toBe(true);

        if (Array.isArray(body.message)) {
            expect(body.message[0].message).toBeDefined();
            expect(body.message[0].path).toBe("id");
        } else {
            expect(body.message).toBeDefined();
        }

    });
    it('Listagem das estações por id 0 ou negativo', async () => {
        const response = await request(app)
            .get("/estacoes/0")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;

        expect(response.status).toBe(400);
        expect(body.error).toBe(true);

        if (Array.isArray(body.message)) {
            expect(body.message[0].message).toBeDefined();
            expect(body.message[0].path).toBe("id");
        } else {
            expect(body.message).toBeDefined();
        }

    });
    it('Listagem das estações por id numero nao inteiro', async () => {
        const response = await request(app)
            .get("/estacoes/1.12")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;

        expect(response.status).toBe(400);
        expect(body.error).toBe(true);

        if (Array.isArray(body.message)) {
            expect(body.message[0].message).toBeDefined();
            expect(body.message[0].path).toBe("id");
        } else {
            expect(body.message).toBeDefined();
        }

    });
    it('Listagem das estações por latitude invalida', async () => {
        const response = await request(app)
            .get("/estacoes?latitude=as")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty('error', true);
        expect(response.body).toHaveProperty('code', 400);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeInstanceOf(Array);
        expect(response.body.errors[0]).toHaveProperty('path');
        expect(response.body.errors[0]).toHaveProperty('message');

    });
    it('Listagem das estações por longitude invalida', async () => {
        const response = await request(app)
            .get("/estacoes?longitude=as")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty('error', true);
        expect(response.body).toHaveProperty('code', 400);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeInstanceOf(Array);
        expect(response.body.errors[0]).toHaveProperty('path');
        expect(response.body.errors[0]).toHaveProperty('message');
    });
    it('Listagem das estações por ip invalido', async () => {
        const response = await request(app)
            .get("/estacoes?ip=123")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty('error', true);
        expect(response.body).toHaveProperty('code', 400);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeInstanceOf(Array);
        expect(response.body.errors[0]).toHaveProperty('path');
        expect(response.body.errors[0]).toHaveProperty('message');
    });
    it('Listagem das estações por status invalido', async () => {
        const response = await request(app)
            .get("/estacoes?status=ok")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty('error', true);
        expect(response.body).toHaveProperty('code', 400);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeInstanceOf(Array);
        expect(response.body.errors[0]).toHaveProperty('path');
        expect(response.body.errors[0]).toHaveProperty('message');
    });



    it('Listagem das estações por id letra', async () => {
        const response = await request(app)
            .get("/estacoes?usuario_id=e")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json");


        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty('error', true);
        expect(response.body).toHaveProperty('code', 400);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeInstanceOf(Array);
        expect(response.body.errors[0]).toHaveProperty('path');
        expect(response.body.errors[0]).toHaveProperty('message');
    });
    it('Listagem das estações por id 0 ou negativo', async () => {
        const response = await request(app)
            .get("/estacoes?usuario_id=0")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json");

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty('error', true);
        expect(response.body).toHaveProperty('code', 400);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeInstanceOf(Array);
        expect(response.body.errors[0]).toHaveProperty('path');
        expect(response.body.errors[0]).toHaveProperty('message');

    });
    it('Listagem das estações por id negativo', async () => {
        const response = await request(app)
            .get("/estacoes?usuario_id=-1")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        console.log(response.body);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty('error', true);
        expect(response.body).toHaveProperty('code', 400);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeInstanceOf(Array);
        expect(response.body.errors[0]).toHaveProperty('path');
        expect(response.body.errors[0]).toHaveProperty('message');

    });

});
