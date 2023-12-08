// models/venda.js
module.exports = (sequelize, DataTypes) => {
  const Venda = sequelize.define('Venda', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    carroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    compradorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dataVenda: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });  

  return Venda;
};
