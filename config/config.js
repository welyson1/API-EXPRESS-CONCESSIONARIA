// config/config.js

require('dotenv').config(); // Variáveis de ambiente

module.exports = {
  development: {
    username: process.env.DB_USER || 'seu_usuario',
    password: process.env.DB_PASSWORD || 'sua_senha',
    database: process.env.DB_NAME || 'concessionaria',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  test: {
    username: process.env.DB_USER || 'seu_usuario',
    password: process.env.DB_PASSWORD || 'sua_senha',
    database: process.env.DB_NAME || 'concessionaria',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  production: {
    username: process.env.DB_USER || 'seu_usuario',
    password: process.env.DB_PASSWORD || 'sua_senha',
    database: process.env.DB_NAME || 'concessionaria',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};
