// models/index.js
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.js'))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

const Usuario = require('./usuario')(sequelize, Sequelize);
const Marca = require('./marca')(sequelize, Sequelize);
const Modelo = require('./modelo')(sequelize, Sequelize);
const Carro = require('./carro')(sequelize, Sequelize);
const Venda = require('./venda')(sequelize, Sequelize);

// Associações
Usuario.hasMany(Venda, { foreignKey: 'compradorId' });
Venda.belongsTo(Usuario, { foreignKey: 'compradorId' });

Carro.belongsTo(Modelo, { foreignKey: 'modeloId' });
Modelo.hasMany(Carro, { foreignKey: 'modeloId' });

Venda.belongsTo(Carro, { foreignKey: 'carroId' });
Carro.hasOne(Venda, { foreignKey: 'carroId' });

Modelo.belongsTo(Marca, { foreignKey: 'marcaId' });
Marca.hasMany(Modelo, { foreignKey: 'marcaId' });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = Usuario;
db.Marca = Marca;
db.Modelo = Modelo;
db.Carro = Carro;
db.Venda = Venda;

module.exports = db;
