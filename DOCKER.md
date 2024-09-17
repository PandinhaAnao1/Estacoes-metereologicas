# Como Rodar o Projeto

Este documento fornece instruções sobre como configurar e iniciar o projeto utilizando Docker. Siga os passos abaixo para garantir que o projeto esteja funcionando corretamente.

## Pré-requisitos

Certifique-se de que você tem o Docker e o Docker Compose instalados em seu sistema.

## Passos para Rodar o Projeto

### 1. Subir o Contêiner

Execute o seguinte comando para construir e iniciar os contêineres Docker definidos no `docker-compose.yml`:

docker compose up --build

### Os próximos passos devem ser realizados em outro terminal

### 2. Executar seed

Execute o seguinte comando para realizar a migração do banco de dados:

docker compose exec -it <nome do container> npm run seed