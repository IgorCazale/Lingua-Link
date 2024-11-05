const express = require('express');
const app = express();
const sequelize = require('./config/database'); // Importa a configuração do banco de dados
const { Matricula } = require('./models/matricula'); // Importa o modelo da matrícula

app.use(express.json()); // Middleware para parsear JSON

// Sincronizar o banco de dados com o modelo
sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado');
}).catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
});

// Rota para criar uma nova matrícula
app.post('http://localhost:3000/matricula', async (req, res) => {
    try {
        const novaMatricula = await matriculas.create(req.body);
        res.status(201).send(`Matrícula realizada com sucesso! ID: ${novaMatricula.id}`);
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).send('Erro ao realizar matrícula.');
    }
});

// Inicializa o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
const cors = require('cors');
app.use(cors());
