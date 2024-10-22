const estacoeCadastrar = {
  "/estacoes": {
    post: {
      tags: ["Estacao"],
      summary: "Cadastra uma estação",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/estacoes_cadastrar_post_body"
            }
          }
        }
      },
      responses: {
        201: {
          description: "Estação cadastrada com sucesso!",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/estacoes_cadastrar_201",
              }
            }
          }
        },
        400: {
          description: "Erro na requisição",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "boolean", example: true },
                  code: { type: "int", example: 400 },
                  message: { type: "array", example: ["Nome informado não é do tipo string", "Nome é obrigatório", "Email informado não é do tipo string", "Email é obrigatório", "Latitude informada não é do tipo number", "Latitude é obrigatória", "Longitude informada não é do tipo number", "Longitude é obrigatória", "IP informado não é do tipo string", "IP é obrigatório", "Formato de IP inválido", "Status não é do tipo string", "Status é obrigatório", "Status informado não corresponde ao formato indicado (ativo ou inativo)", "Estação sem vínculo com usuário", "ID não é do tipo number", "ID não é um tipo inteiro", "ID não é um inteiro positivo", "Usuário não encontrado", "Erro ao cadastrar estação"] }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default estacoeCadastrar;
