# Vehicle API

Este projeto é uma API para gerenciamento de veículos.

## Tecnologias Utilizadas

As principais tecnologias utilizadas neste projeto incluem:

- **TypeScript:** Linguagem de programação que adiciona tipagem estática ao JavaScript.
- **Fastify:** Framework web rápido e de baixo overhead para Node.js.
- **Prisma:** ORM moderno para Node.js e TypeScript, utilizado para acesso ao banco de dados.
- **Zod:** Biblioteca de validação de schema com inferência de tipos TypeScript.
- **Jest:** Framework de teste para JavaScript (utilizado para testes unitários/de integração).
- **Docker:** Plataforma para desenvolver, enviar e executar aplicativos em contêineres.

## Configuração e Execução

### Pré-requisitos

Certifique-se de ter instalado:

- Node.js (versão 20 ou superior)
- Docker e Docker Compose

### Configuração do Banco de Dados

Este projeto utiliza PostgreSQL. As configurações de conexão devem ser definidas em um arquivo `.env` na raiz do projeto.

```dotenv
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
```

### Execução Local

1.  Instale as dependências:

    ```bash
    npm install
    ```

2.  Configure o arquivo `.env` com suas credenciais do banco de dados.

3.  Gere o prisma client:

    ```bash
    npx prisma generate
    ```

4.  Execute as migrações do banco de dados:

    ```bash
    npx prisma migrate dev
    ```

5.  Execute o seeder inicial (se aplicável):

    ```bash
    npx prisma db seed
    ```

6.  Execute a aplicação em modo de desenvolvimento:

    ```bash
    npm run dev
    ```

A API estará disponível em `http://localhost:3333` (ou a porta configurada).

### Execução com Docker Compose

1.  Configure o arquivo `.env` com suas credenciais do banco de dados.

2.  Construa e execute os contêineres:

    ```bash
    docker compose up --build
    ```

    Isso irá subir o contêiner da aplicação e do banco de dados (se configurado no docker-compose.yml).

## Testes

Execute os testes:

```bash
npm test
```

## Documentação da API (Swagger)

A documentação da API está disponível em `http://localhost:3333/docs` quando a aplicação estiver em execução.
