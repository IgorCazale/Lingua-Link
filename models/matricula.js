const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Caminho para a configuração do banco

const Matricula = sequelize.define('matriculas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome_completo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nome_social: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    data_nascimento: {
        type: DataTypes.DATEONLY, // Apenas a data, sem hora
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    rg: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    como_soube: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    responsavel: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    curso: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    data_matricula: {
        type: DataTypes.DATE, // Usando `DATE` para timestamp
        defaultValue: DataTypes.NOW, // Data/hora atual como padrão
        allowNull: false
    }
}, {
    tableName: 'matriculas', // Nome da tabela no banco de dados
    timestamps: false // Desativa os timestamps automáticos (createdAt e updatedAt)
});

module.exports = Matricula;
