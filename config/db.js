const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração de conexão com o banco de dados MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco de dados
  process.env.DB_USER, // Usuário do banco
  process.env.DB_PASSWORD, // Senha do banco
  {
    host: process.env.DB_HOST, // Geralmente 'localhost' ou '127.0.0.1'
    dialect: 'mysql', // O tipo de banco de dados
    logging: false, // Para não mostrar logs de SQL no console
  }
);

// Testando a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;