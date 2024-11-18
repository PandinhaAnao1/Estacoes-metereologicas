import commonResponses from './../../docs/schemas/commonResponses.js';  
import messages from '../../util/messages.js';

describe('commonResponses', () => {
    test('200 response', () => {
        const response = commonResponses[200]();
        expect(response).toBeDefined();
        expect(response).toHaveProperty('description', "Sucesso");
        expect(response).toHaveProperty('content.application/json.schema.type', "object");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.example');
        expect(response).toHaveProperty('content.application/json.schema.properties.error.type', "boolean");
        expect(response).toHaveProperty('content.application/json.schema.properties.error.example', false);
        expect(response).toHaveProperty('content.application/json.schema.properties.code.type', "integer");
        expect(response).toHaveProperty('content.application/json.schema.properties.code.example', 200);
        expect(response).toHaveProperty('content.application/json.schema.properties.message.type', "string");
        expect(response).toHaveProperty('content.application/json.schema.properties.message.example', messages.httpCodes[200]);
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.example');
    });

    test('201 response', () => {
        const response = commonResponses[201]();
        expect(response).toBeDefined();
        expect(response).toHaveProperty('description', "Criado");
        expect(response).toHaveProperty('content.application/json.schema.type', "object");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.example');
        expect(response).toHaveProperty('content.application/json.schema.properties.error.type', "boolean");
        expect(response).toHaveProperty('content.application/json.schema.properties.error.example', false);
        expect(response).toHaveProperty('content.application/json.schema.properties.code.type', "integer");
        expect(response).toHaveProperty('content.application/json.schema.properties.code.example', 201);
        expect(response).toHaveProperty('content.application/json.schema.properties.message.type', "string");
        expect(response).toHaveProperty('content.application/json.schema.properties.message.example', messages.httpCodes[201]);
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.example');
    });

    test('400 response', () => {
        const response = commonResponses[400]();
        expect(response).toBeDefined();
        expect(response).toHaveProperty('description', "Requisição inválida");
        expect(response).toHaveProperty('content.application/json.schema.type', "object");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.example');
        expect(response).toHaveProperty('content.application/json.schema.properties.error.type', "boolean");
        expect(response).toHaveProperty('content.application/json.schema.properties.error.example', true);
        expect(response).toHaveProperty('content.application/json.schema.properties.code.type', "integer");
        expect(response).toHaveProperty('content.application/json.schema.properties.code.example', 400);
        expect(response).toHaveProperty('content.application/json.schema.properties.message.type', "string");
        expect(response).toHaveProperty('content.application/json.schema.properties.message.example', messages.httpCodes[400]);
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.items');
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.example');
    });

    test('401 response', () => {
        const response = commonResponses[401]();
        expect(response).toBeDefined();
        expect(response).toHaveProperty('description', "Não autorizado");
        expect(response).toHaveProperty('content.application/json.schema.type', "object");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.example');
        expect(response).toHaveProperty('content.application/json.schema.properties.error.type', "boolean");
        expect(response).toHaveProperty('content.application/json.schema.properties.error.example', false);
        expect(response).toHaveProperty('content.application/json.schema.properties.code.type', "integer");
        expect(response).toHaveProperty('content.application/json.schema.properties.code.example', 401);
        expect(response).toHaveProperty('content.application/json.schema.properties.message.type', "string");
        expect(response).toHaveProperty('content.application/json.schema.properties.message.example', messages.httpCodes[401]);
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.example');
    });

    test('404 response', () => {
        const response = commonResponses[404]();
        expect(response).toBeDefined();
        expect(response).toHaveProperty('description', "Não encontrado");
        expect(response).toHaveProperty('content.application/json.schema.type', "object");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.example');
        expect(response).toHaveProperty('content.application/json.schema.properties.error.type', "boolean");
        expect(response).toHaveProperty('content.application/json.schema.properties.error.example', false);
        expect(response).toHaveProperty('content.application/json.schema.properties.code.type', "integer");
        expect(response).toHaveProperty('content.application/json.schema.properties.code.example', 404);
        expect(response).toHaveProperty('content.application/json.schema.properties.message.type', "string");
        expect(response).toHaveProperty('content.application/json.schema.properties.message.example', messages.httpCodes[404]);
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.example');
    });

    test('498 response', () => {
        const response = commonResponses[498]();
        expect(response).toBeDefined();
        expect(response).toHaveProperty('description', "Token inválido");
        expect(response).toHaveProperty('content.application/json.schema.type', "object");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.example');
        expect(response).toHaveProperty('content.application/json.schema.properties.error.type', "boolean");
        expect(response).toHaveProperty('content.application/json.schema.properties.error.example', true);
        expect(response).toHaveProperty('content.application/json.schema.properties.code.type', "integer");
        expect(response).toHaveProperty('content.application/json.schema.properties.code.example', 498);
        expect(response).toHaveProperty('content.application/json.schema.properties.message.type', "string");
        expect(response).toHaveProperty('content.application/json.schema.properties.message.example');
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.example');
    });

    test('500 response', () => {
        const response = commonResponses[500]();
        expect(response).toBeDefined();
        expect(response).toHaveProperty('description', "Erro interno");
        expect(response).toHaveProperty('content.application/json.schema.type', "object");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.data.example', []);
        expect(response).toHaveProperty('content.application/json.schema.properties.error.type', "boolean");
        expect(response).toHaveProperty('content.application/json.schema.properties.error.example', true);
        expect(response).toHaveProperty('content.application/json.schema.properties.code.type', "integer");
        expect(response).toHaveProperty('content.application/json.schema.properties.code.example', 500);
        expect(response).toHaveProperty('content.application/json.schema.properties.message.type', "string");
        expect(response).toHaveProperty('content.application/json.schema.properties.message.example', messages.httpCodes[500]);
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.type', "array");
        expect(response).toHaveProperty('content.application/json.schema.properties.errors.example', [{ message: messages.httpCodes[500] }]);
    });
});
