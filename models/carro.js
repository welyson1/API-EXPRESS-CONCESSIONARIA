// models/carro.js

module.exports = (sequelize, DataTypes) => {
  const Carro = sequelize.define('Carro', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  return Carro;
};
