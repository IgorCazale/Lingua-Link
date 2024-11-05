const sequelize = require('../config/database');

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão bem-sucedida com o banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
}

testConnection();
