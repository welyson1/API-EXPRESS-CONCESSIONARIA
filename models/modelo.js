// models/modelo.js

module.exports = (sequelize, DataTypes) => {
  const Modelo = sequelize.define('Modelo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Modelo;
};
