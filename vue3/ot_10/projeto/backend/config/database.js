const { Sequelize } = require('sequelize');

// XAMPP: root sem senha, banco ecommerce
const sequelize = new Sequelize('ecommerce', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

sequelize.authenticate()
  .then(() => console.log('MySQL conectado (ecommerce).'))
  .catch(err => console.error('Erro de conexão:', err.message));

module.exports = sequelize;
