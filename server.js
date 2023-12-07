// ./server.js

const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurações do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Concessionária API',
      version: '1.0.0',
      description: 'Documentação da API da Concessionária',
    },
  },
  apis: ['./routes/*.js'], // Padrão de arquivos que contêm as rotas
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas
const appRoutes = require('./app');
app.use('/', appRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server executando na porta ${PORT}`);
});
