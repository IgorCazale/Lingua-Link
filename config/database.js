const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lingua_link', 'root', '5211688', {
    host: 'localhost', // ou o IP do servidor MySQL
    dialect: 'mysql'
});

module.exports = sequelize;
