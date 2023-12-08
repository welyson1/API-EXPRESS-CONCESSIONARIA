const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Concessionária API',
      version: '1.0.0',
    },
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Use a palavra-chave \'Bearer\' seguida pelo token JWT',
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos de rota
  security: [{
    BearerAuth: []
  }],
};

const specs = swaggerJsdoc(options);

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, { explorer: true }));

module.exports = router;
