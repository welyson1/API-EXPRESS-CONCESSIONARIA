# Concessionária API

## Descrição

Esta é uma API para gerenciar dados de uma concessionária, incluindo usuários, marcas, modelos, carros e vendas.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Sequelize (ORM para interação com o banco de dados)
- PostgreSQL (Banco de dados relacional)
- Nodemon (Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/welyson1/API-EXPRESS-CONCESSIONARIA.git
   ```

2. Instale as dependências:

   ```bash
   cd API-EXPRESS-CONCESSIONARIA
   npm install
   ```

3. Configure o banco de dados local no arquivo `/.env` para ter o nome `concessionaria`.
    ```bash
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=root
    DB_NAME=concessionaria
    JWT_SECRET=9d9e538082cc0da0eb65ff310ffc7ec1369e16e20d675276e969eb20d34944c2 // Ou mude para uma de sua preferencia
   ```

4. Execute o servidor com nodemon:

   ```bash
   npm start
   ```

5. Acesse a rota de instalação para criar as tabelas no banco de dados:

   ```
   http://localhost:3000/install
   ```

6. Veja a documentação

- `GET /docs`: Documentação de todas as rotas

## Autenticação

A autenticação é necessária para acessar alguns endpoints. Ao efetuar login, um token JWT é gerado e deve ser incluído no cabeçalho `Authorization` para autenticação.

Exemplo:

```
Authorization: Bearer SEU_TOKEN_JWT
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).