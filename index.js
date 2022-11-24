const express = require('express');
const tables = require('./database/tables');
const app = express();

app.use(express.json());

// Teste de Conexão Localhost 3000
app.get('/', (req, resp)=>{
    resp.send({'mensagem':'tudo está conectado'});
})

//Rotas do Produto

// Adicionar Produto
app.post('/add-product', (req, resp)=>{
    tables.Produto.create({
        nome_produto: req.body.nome_produto,
        preco_produto:req.body.preco_produto,
        quantidade_produto: req.body.quantidade_produto      
    })
    .then(()=>{resp.send('Cadastrado com sucesso')})
    .catch((err)=>{resp.send("Erro: Cadastrado não foi realizado. Motivo:" + err)})
})

// Pesquisar Produtos
app.get('/search-product', async (req, resp)=>{
    await tables.Produto.findAll({
        attributes: ['id_produto','nome_produto', 'preco_produto', 'quantidade_produto']
      })
    .then((data)=>{resp.send({'data': data})})
    .catch((err)=>{console.log(err)})
    ;
})

// Deletar Produto por Id
app.get('/delete-product/:id', async (req, resp)=>{    
    await tables.Produto.destroy({where: {id_produto: req.params.id}, force: true})
    .then(()=>{resp.send('Deletado com sucesso')})
    .catch((err)=>{resp.send("Erro: Não foi possível deletar. Erro:" + err)})
})

// Atualizar Produto por Id
app.patch('/update-product/:id', async (req, resp)=>{    
    await tables.Produto.findOne({where: {id_produto: req.params.id}, force: true})
    .then((response)=>{
        response.update({
        nome_produto: req.body.nome_produto,
        preco_produto:req.body.preco_produto,
        quantidade_produto: req.body.quantidade_produto    
    }), resp.send('Atualizado com sucesso')
    })
    .catch((err)=>{resp.send("Erro: Não foi possível atualizar. Erro:" + err)})
})

//Rotas do Cliente

// Adicionar Cliente
app.post('/add-client', (req, resp)=>{
    tables.Cliente.create({
        nome_cliente: req.body.nome_cliente,
        email_cliente: req.body.email_cliente,
        password_cliente: req.body.password_cliente,
        cpf_cliente: req.body.cpf_cliente,
        nascimento_cliente: req.body.nascimento_cliente        
    })
    .then(()=>{resp.send('Cadastrado com sucesso')})
    .catch((err)=>{resp.send("Erro: Cliente não foi cadastrado!" + err)})
})

// Pesquisar Clientes Cadastrados
app.get('/search-clients', async (req, resp)=>{
    await tables.Cliente.findAll({
        attributes: ['id_cliente','nome_cliente','email_cliente', 'password_cliente', 'cpf_cliente', 'nascimento_cliente']
      })
    .then((data)=>{resp.send({'data': data})})
    .catch((err)=>{console.log(err)})
    ;
})

// Deletar Cliente por Id
app.get('/delete-client/:id', async (req, resp)=>{    
    await tables.Cliente.destroy({where: {id_cliente: req.params.id}, force: true})
    .then(()=>{resp.send('Deletado com sucesso')})
    .catch((err)=>{resp.send("Erro: Não foi possível deletar. Erro:" + err)})
})

// Atualizar Cliente por Id
app.patch('/update-client/:id', async (req, resp)=>{    
    await tables.Cliente.findOne({where: {id_cliente: req.params.id}, force: true})
    .then((response)=>{
        response.update({
            nome_cliente: req.body.nome_cliente,
            email_cliente: req.body.email_cliente,
            password_cliente: req.body.password_cliente,
            cpf_cliente: req.body.cpf_cliente,
            nascimento_cliente: req.body.nascimento_cliente 
    }), resp.send('Atualizado com sucesso')
    })
    .catch((err)=>{resp.send("Erro: Não foi possível atualizar. Erro:" + err)})
})

// Conexão Localhost 3000

app.listen(3000,()=>{
    console.log('Servidor Iniciado');
})