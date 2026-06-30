const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  nome:      { type: DataTypes.STRING, allowNull: false },
  preco:     { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  categoria: { type: DataTypes.STRING },
  imagem:    { type: DataTypes.STRING },
  descricao: { type: DataTypes.TEXT }
});

module.exports = Produto;
