// models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importando a conexão do banco de dados

// Definindo a classe User
class User extends Model {}

// Inicializando o modelo com as colunas e seus tipos
User.init({
  username: {
    type: DataTypes.STRING, // Tipo de dado: string
    allowNull: false,       // Não pode ser nulo
  },
  password: {
    type: DataTypes.STRING, // Tipo de dado: string
    allowNull: false,       // Não pode ser nulo
  },
  email: {
    type: DataTypes.STRING, // Tipo de dado: string
    allowNull: false,       // Não pode ser nulo
    unique: true,           // Deve ser único
  }
}, {
  sequelize,               // Passando a instância do Sequelize
  modelName: 'User',      // Nome do modelo
});

// Exportando o modelo para ser utilizado em outras partes do projeto
module.exports = User;
