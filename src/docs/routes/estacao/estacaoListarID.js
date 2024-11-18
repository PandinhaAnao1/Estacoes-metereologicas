import commonResponses from "../../schemas/commonResponses.js";

const estacaoListarId = {

  //getId
  "/estacoes/{id}": {
    get: {
      tags: ["Estacao"],
      summary: "Lista uma estacão pelo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID da Estação",
          required: true,
          schema: {
            type: "integer",
            example: 1
          }
        }
      ],
      responses: {
        200: commonResponses["200"]('#/components/schemas/estacoes_listarPorId_200'),
        400: commonResponses["400"](null,null,'#/components/schemas/estacoes_listarPorId_400'),
        500: commonResponses["500"]()

      }
    }
  }
};

export default estacaoListarId;