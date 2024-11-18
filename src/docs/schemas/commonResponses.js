import messages from "../../util/messages.js";

const commonResponses = {
    200: (schemaRef = null, description = "Sucesso") => ({
        description: description,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        data: schemaRef ? { $ref: schemaRef } : { type: "array", items: {}, example: [] },
                        error: { type: "boolean", example: false },
                        code: { type: "integer", example: 200 },
                        message: { type: "string", example: messages.httpCodes[200] },
                        errors: { type: "array", example: [] }
                    }
                }
            }
        }
    }),

    201: (schemaRef = null, description = "Criado") => ({
        description: description,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        data: schemaRef ? { $ref: schemaRef } : { type: "array", items: {}, example: [] },
                        error: { type: "boolean", example: false },
                        code: { type: "integer", example: 201 },
                        message: { type: "string", example: messages.httpCodes[201] },
                        errors: { type: "array", example: [] }
                    }
                }
            }
        }
    }),

    400: (schemaRef = null, description = "Requisição inválida", errors = null) => ({
        description: description,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        data: schemaRef ? { $ref: schemaRef } : { type: "array", items: {}, example: [] },
                        error: { type: "boolean", example: true },
                        code: { type: "integer", example: 400 },
                        message: { type: "string", example: messages.httpCodes[400] },
                        errors: errors ?  { $ref: errors } : { type: "array", items: {}, example: [] }
                    }
                }
            }
        }
    }),

    401: (schemaRef = null, description = "Não autorizado", errors = null) => ({
        description: description,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        data: schemaRef ? { $ref: schemaRef } : { type: "array", items: {}, example: [] },
                        error: { type: "boolean", example: false },
                        code: { type: "integer", example: 401 },
                        message: { type: "string", example: messages.httpCodes[401] },
                        errors: errors ?  { $ref: errors } : { type: "array", items: {}, example: [] }
                    }
                }
            }
        }
    }),

    404: (schemaRef = null, description = "Não encontrado",errors = null) => ({
        description: description,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        data: schemaRef ? { $ref: schemaRef } : { type: "array", items: {}, example: [] },
                        error: { type: "boolean", example: false },
                        code: { type: "integer", example: 404 },
                        message: { type: "string", example: messages.httpCodes[404] },
                        errors: errors ?  { $ref: errors } : { type: "array", items: {}, example: [] }
                    }
                }
            }
        }
    }),

    498: (schemaRef = null, description = "Token inválido",errors = null) => ({
        description: description,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        data: schemaRef ? { $ref: schemaRef } : { type: "array", items: {}, example: [] },
                        error: { type: "boolean", example: true },
                        code: { type: "integer", example: 498 },
                        message: { type: "string", example: messages.httpCodes[498] },
                        errors: errors ?  { $ref: errors } : { type: "array", items: {}, example: [] }
                    }
                }
            }
        }
    }),

    500: (schemaRef = null, description = "Erro interno") => ({
        description: description,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        data: schemaRef ? { $ref: schemaRef } : { type: "array", items: {}, example: [] },
                        error: { type: "boolean", example: true },
                        code: { type: "integer", example: 500 },
                        message: { type: "string", example: messages.httpCodes[500] },
                        errors: { type: "array", example: [{ message: messages.httpCodes[500] }] }
                    }
                }
            }
        }
    })
};

export default commonResponses;
