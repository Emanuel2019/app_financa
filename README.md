

## Description

# Financa App

Financa App é uma aplicação para gerenciamento de finanças pessoais, desenvolvida usando NestJS. Esta aplicação permite realizar operações bancárias como depósito, levantamento, transferência de fundos e mantém um histórico de todas as operações.

## Funcionalidades

- **Autenticação JWT:** Segurança através de tokens JWT.
- **Gerenciamento de Contas:** Criar, desativar e listar contas bancárias.
- **Movimentações:** Depósito, levantamento e transferência de fundos entre contas.
- **Histórico:** Manter um registro de todas as operações realizadas.

## Tecnologias Utilizadas

- **NestJS:** Framework Node.js para a construção de aplicações eficientes e escaláveis.
- **TypeORM:** ORM para interagir com bancos de dados.
- **MySQL:** Banco de dados relacional.
- **Swagger:** Documentação da API.
- **JWT:** Autenticação segura.
- **BullMQ:** Gerenciamento de filas para processamento assíncrono.

## Requisitos

- Node.js
- MySQL
- Redis
## Instalação

1. Clone o repositório:

    git clone https://github.com/seu-usuario/financa-app.git
    cd financa-app

2. Instale as dependências:
    npm install
  
3. Configure o banco de dados MySQL e Redis no arquivo `.env`:
    DATABASE_HOST=localhost
    DATABASE_PORT=3306
    DATABASE_USER=root
    DATABASE_PASSWORD=
    DATABASE_NAME=teste_bank
    REDIS_HOST=localhost
    REDIS_PORT=6379
  
4. Execute as migrações do banco de dados:

    npm run typeorm migration:run

5. Inicie a aplicação:
    
    npm run start
  

## Uso

### Autenticação

Para autenticação, obtenha um token JWT fazendo login com suas credenciais:
POST /auth/login
### Endpoints
### Usuários
1.Criar
POST /users/register
2. Atualizar 
PUT /users/id
3 Delete
DELETE /users/id
4.Listar 
GET /users
GET /users/id
### Conta Bancária
1.Criar
POST /conta
2.Atualizar
PUT POST /conta/id
3.Excluir
DELETE/conta/id
4.Listar
GET POST /conta
GET POST /conta/id
5.Desativar 
PUT POST /conta/id
6.Ativar
POST /conta/id
### Operações bancárias
1.Criar
POST /movimentacao
2.Atualizar
PUT POST /movimentacao/id
3.Transferir
 POST /movimentacao
4.Listar
GET POST /movimentacao
GET POST /movimentacao/id
### Histórico
1.Listar
GET POST /historicos
GET POST /historicos/id
### Documentação da API
A documentação completa da API pode ser acessada via Swagger em:
http://localhost:3000/
