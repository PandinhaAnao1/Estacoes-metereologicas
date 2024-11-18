import messages, { sendError, sendResponse } from './../../util/messages.js';

describe('messages', () => {
    it('deve ter mensagens de status HTTP corretas', () => {
        expect(messages.httpCodes[200]).toBe("Requisição bem sucedida.");
        expect(messages.httpCodes[404]).toBe("O recurso solicitado não foi encontrado no servidor.");
        expect(messages.httpCodes[500]).toBe("Servidor encontrou um erro interno.");
    });
});

describe('sendError', () => {
    let res;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    it('deve enviar resposta de erro com mensagem de string', () => {
        sendError(res, 400, "Mensagem de erro");
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            data: [],
            error: true,
            code: 400,
            message: "Requisição com sintaxe incorreta ou outros problemas.",
            errors: [{ message: "Mensagem de erro" }]
        });
    });

    it('deve enviar resposta de erro com array de erros', () => {
        sendError(res, 400, [{ message: "msg A" }, { message: "msg B" }]);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            data: [],
            error: true,
            code: 400,
            message: "Requisição com sintaxe incorreta ou outros problemas.",
            errors: [{ message: "msg A" }, { message: "msg B" }]
        });
    });

    it('deve enviar resposta de erro com objeto de erro', () => {
        sendError(res, 400, { message: "Campo Obrigatório", field: "senha" });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            data: [],
            error: true,
            code: 400,
            message: "Requisição com sintaxe incorreta ou outros problemas.",
            errors: [{ message: "Campo Obrigatório", field: "senha" }]
        });
    });
});

describe('sendResponse', () => {
    let res;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    it('deve enviar resposta com dados', () => {
        const data = { encontrado: true, data: { usuario: "user" } };
        sendResponse(res, 200, {data: data});
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            error: false,
            code: 200,
            message: "Requisição bem sucedida.",
            errors: [],
            data: data
        });
    });

    it('deve enviar resposta sem dados', () => {
        sendResponse(res, 204);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({
            error: false,
            code: 204,
            message: "Requisição bem sucedida, sem conteúdo para retornar",
            errors: [],
            data: []
        });
    });
});
