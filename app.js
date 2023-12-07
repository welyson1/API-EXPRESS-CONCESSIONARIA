// ./app.js

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

// Tratamento de erro global
app.use((err, req, res, next) => {
  console.error('Erro global:', err);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

app.use(bodyParser.json());
app.use(routes);

module.exports = app;
