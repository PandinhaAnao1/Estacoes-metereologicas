import request from "supertest";
import { expect, describe } from "@jest/globals";
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
        expect(response.body.message).toBe('Usuário não encontrado.');
    });
    it('Deve retornar erro ao tentar cadastrar estação sem passar os atributos', async () => {
      const response = await request(app)
          .post('/estacoes')
          .set("Authorization", `Bearer ${token}`)
          .set("Content-Type", "application/json")
          .send({
          });
        //console.log(response.body.message[0].message)
        expect(response.status).toBe(400);
        expect(response.body.message[0].message).toBe("Nome é obrigatório.")
        expect(response.body.message[0].path).toBe("nome")
        expect(response.body.message[1].message).toBe("Email é obrigatório.")
        expect(response.body.message[1].path).toBe("endereco")
        expect(response.body.message[2].message).toBe("Latitude informada não é do tipo number.")
        expect(response.body.message[2].path).toBe("latitude")
        expect(response.body.message[3].message).toBe("Longitude informada não é do tipo number.")
        expect(response.body.message[3].path).toBe("longitude")
        expect(response.body.message[4].message).toBe("Ip é obrigatório.")
        expect(response.body.message[4].path).toBe("ip")
        expect(response.body.message[5].message).toBe("Status informado não corresponde ao formato indicado (ativo ou inativo).")
        expect(response.body.message[5].path).toBe("status")
        expect(response.body.message[6].message).toBe("Estação sem vínculo com usuário.")
        expect(response.body.message[6].path).toBe("usuario_id")
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
            .set("Content-Type", "application/json")
        expect(response.status).toBe(200); 
        expect(response.body.error).toBe(false) 
        expect({ id: idvalido }).toHaveProperty('id', idvalido);
        expect(response.headers['content-type']).toContain('json');
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.data).toBeInstanceOf(Object);
        expect(response.body.message).toBe("Estação encontrada com sucesso")
        expect(typeof response.body.data.id).toBe('number');
        expect(typeof response.body.data.nome).toBe('string');
        expect(typeof response.body.data.endereco).toBe('string');
        expect(typeof response.body.data.latitude).toBe('number');
        expect(typeof response.body.data.longitude).toBe('number');
        expect(typeof response.body.data.ip).toBe('string');
        expect(typeof response.body.data.status).toBe('string');
        expect(typeof response.body.data.usuario_id).toBe('number');
        //console.log(response.body.data.id)
    });
    it('Deve retornar que nao localizou as estações', async () => {
      const response = await request(app)
          .get(`/estacoes?id=2222`)
          .set("Authorization", `Bearer ${token}`)
          .set("Content-Type", "application/json")
      const body = response.body;
      expect(response.status).toBe(400);
      //expect(body.data).toBeInstanceOf(Array);
      expect(response.body.message).toBe("Nenhuma estação encontrada.")
      expect(response.body.error).toBe(true) 
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
      expect(response.body.error).toBe(true) 
      expect(response.body.message[0].message).toBe("Id informado não é do tipo number.")
      expect(response.body.message[0].path).toBe("id")
      expect(response.body.message).toBeInstanceOf(Object);
      //console.log(response.body.message[0].message)
  });
  it('Listagem das estações por id 0 ou negativo', async () => {
    const response = await request(app)
        .get("/estacoes/0")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
    const body = response.body;
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true) 
    expect(response.body.message[0].message).toBe("Id informado não é positivo.")
    expect(response.body.message[0].path).toBe("id")
    expect(response.body.message).toBeInstanceOf(Object);
    //console.log(response.body.message[0].message)
});
it('Listagem das estações por id numero nao inteiro', async () => {
  const response = await request(app)
      .get("/estacoes/1.12")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
  const body = response.body;
  expect(response.status).toBe(400);
  expect(response.body.error).toBe(true) 
  expect(response.body.message[0].message).toBe("Id informado não é um número inteiro.")
  expect(response.body.message[0].path).toBe("id")
  expect(response.body.message).toBeInstanceOf(Object);
  //console.log(response.body.message[0].message)
});
it('Listagem das estações por latitude invalida', async () => {
  const response = await request(app)
      .get("/estacoes?latitude=as")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
  const body = response.body;
  expect(response.status).toBe(400);
  expect(response.body.error).toBe(true) 
  expect(response.body.message[0].message).toBe("Latitude informada não é do tipo number.")
  expect(response.body.message[0].path).toBe("latitude")
  expect(response.body.message).toBeInstanceOf(Object);
  //console.log(response.body.message[0].message)
});
it('Listagem das estações por longitude invalida', async () => {
  const response = await request(app)
      .get("/estacoes?longitude=as")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
  const body = response.body;
  expect(response.status).toBe(400);
  expect(response.body.error).toBe(true) 
  expect(response.body.message[0].message).toBe("Longitude informada não é do tipo number.")
  expect(response.body.message[0].path).toBe("longitude")
  expect(response.body.message).toBeInstanceOf(Object);
  //console.log(response.body.message[0].message)
});
it('Listagem das estações por ip invalido', async () => {
  const response = await request(app)
      .get("/estacoes?ip=123")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
  const body = response.body;
  expect(response.status).toBe(400);
  expect(response.body.error).toBe(true) 
  expect(response.body.message[0].message).toBe("Ip informado não segue o padrão (IPv4 ou IPv6).")
  expect(response.body.message[0].path).toBe("ip")
  expect(response.body.message).toBeInstanceOf(Object);
  //console.log(response.body.message[0].message)
});
it('Listagem das estações por status invalido', async () => {
  const response = await request(app)
      .get("/estacoes?status=ok")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
  const body = response.body;
  expect(response.status).toBe(400);
  expect(response.body.error).toBe(true) 
  expect(response.body.message[0].message).toBe("Status informado não corresponde ao formato indicado (ativo ou inativo).")
  expect(response.body.message[0].path).toBe("status")
  expect(response.body.message).toBeInstanceOf(Object);
  //console.log(response.body.message[0].message)
});



it('Listagem das estações por id letra', async () => {
    const response = await request(app)
        .get("/estacoes?usuario_id=e")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
    const body = response.body;
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true) 
    expect(response.body.message[0].message).toBe("Id do usuário informado não é do tipo number.")
    expect(response.body.message[0].path).toBe("usuario_id")
    expect(response.body.message).toBeInstanceOf(Object);
    //console.log(response.body.message[0].message)
});
it('Listagem das estações por id 0 ou negativo', async () => {
  const response = await request(app)
      .get("/estacoes?usuario_id=0")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
  const body = response.body;
  expect(response.status).toBe(400);
  expect(response.body.error).toBe(true) 
  expect(response.body.message[0].message).toBe("Id do usuário informado não é um inteiro positivo.")
  expect(response.body.message[0].path).toBe("usuario_id")
  expect(response.body.message).toBeInstanceOf(Object);
  //console.log(response.body.message[0].message)
});
it('Listagem das estações por id negativo', async () => {
const response = await request(app)
    .get("/estacoes?usuario_id=-1")
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "application/json")
const body = response.body;
expect(response.status).toBe(400);
expect(response.body.error).toBe(true) 
expect(response.body.message[0].message).toBe("Id do usuário informado não é um inteiro positivo.")
expect(response.body.message[0].path).toBe("usuario_id")
expect(response.body.message).toBeInstanceOf(Object);
//console.log(response.body.message[0].message)
});


});
