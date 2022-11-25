const Sequelize = require('sequelize');
const database = require('./connection')

const Cliente = database.sequelize.define('cliente', {
    id_cliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_cliente: {
        type: Sequelize.STRING,
    },
    email_cliente: {
        type: Sequelize.STRING,
    },
    password_cliente: {
        type: Sequelize.STRING
    },
    cpf_cliente: {
        type: Sequelize.INTEGER,
    },
    nascimento_cliente: {
        type: Sequelize.STRING
    }    
    },{
    timestamps: false
    }
);

const Produto = database.sequelize.define('produto', {
    id_produto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_produto: {
        type: Sequelize.STRING,
    },
    preco_produto: {
        type: Sequelize.STRING,
    },
    quantidade_produto: {
        type: Sequelize.INTEGER,
    }     
    },{
    timestamps: false
    }
);

const Compra = database.sequelize.define('compra', {
    id_compra: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    produto_compra: {
        type: Sequelize.STRING,
    },
    preco_compra: {
        type: Sequelize.STRING,
    },
    quantidade_compra: {
        type: Sequelize.INTEGER,
    }   
    },{
    timestamps: false
    }
);

// Criar a tabela
Cliente.sync({force: true})
Produto.sync({force: true})
Compra.sync({force: true})

module.exports = {Cliente , Produto, Compra}