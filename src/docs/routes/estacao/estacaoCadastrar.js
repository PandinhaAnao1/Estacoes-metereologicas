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
                $ref:''
              }
            }
          }
        }
      }
    }
  }
};

export default estacoeCadastrar;
