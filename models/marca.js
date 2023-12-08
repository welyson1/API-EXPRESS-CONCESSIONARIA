// models/marca.js

module.exports = (sequelize, DataTypes) => {
  const Marca = sequelize.define('Marca', {
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

  return Marca;
};
