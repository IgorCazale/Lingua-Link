// testUser.js
const sequelize = require('./config/database'); // Importando a conexão do banco de dados
const User = require('./models/user.js'); // Importando o modelo User

// Função assíncrona para testar a criação de um usuário
async function testUserCreation() {
  try {
    // Sincroniza os modelos com o banco de dados (cria as tabelas se não existirem)
    await sequelize.sync();

    // Cria um novo usuário
    const newUser = await User.create({
      username: 'testuser',
      password: 'password123',
      email: 'testuser@example.com',
    });

    console.log('Usuário criado com sucesso:', newUser.toJSON());
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
  } finally {
    // Fecha a conexão com o banco de dados
    await sequelize.close();
  }
}

// Executa a função
testUserCreation();
// testUser.js
const sequelize = require('./config/database'); // Importando a conexão do banco de dados
const User = require('./models/user.js'); // Importando o modelo User

// Função assíncrona para testar a criação de um usuário
async function testUserCreation() {
  try {
    // Sincroniza os modelos com o banco de dados (cria as tabelas se não existirem)
    await sequelize.sync();

    // Cria um novo usuário
    const newUser = await User.create({
      username: 'testuser',
      password: 'password123',
      email: 'testuser@example.com',
    });

    console.log('Usuário criado com sucesso:', newUser.toJSON());
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
  } finally {
    // Fecha a conexão com o banco de dados
    await sequelize.close();
  }
}

// Executa a função
testUserCreation();
