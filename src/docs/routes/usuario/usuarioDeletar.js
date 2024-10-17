const usuarioDeletar = {

  //Delete
  "/usuarios/{id}": {
    delete: {
      tags: ["Usuario"],
      summary: "Detela um usuário pelo id",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do usuário",
          required: true,
          schema: {
            type: "integer",
            example: 9
          }
        }
      ],
      responses: {
        // 204: {
        //   content: {
        //     "application/json": {
        //       schema: {
        //         $ref: "#/components/schemas/deltar_204"

        //       }
        //     }
        //   }
        // },
        400: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/deltar_400"

              }
            }
          }
        },
        500: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/deltar_500"

              }
            }
          }
        }
      }
    }
  }
};

export default usuarioDeletar;